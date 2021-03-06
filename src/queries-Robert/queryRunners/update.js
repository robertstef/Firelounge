import QueryInfo from "../parser/QueryInfo";
import {getCollection, getWheres, getSets} from '../parser/queryParser';
import {getDataForSelect} from '../dataBase/selectDb';
import {updateFields} from '../dataBase/updateDb';

// UPDATE table_name SET field1 = new-value1, field2 = new-value2
// [WHERE Clause]

/**
 *
 * @param query
 * @param dataBase
 * @param commitResults
 */
export const executeUpdate = async (query, dataBase, commitResults) => {
    let db_ref;
    query = query.replace(/(\r\n|\n|\r)/gm, " "); // filter out potential newline character
    db_ref = await execUpdate(query, dataBase, commitResults);
    return db_ref
};

/**
 *
 * @param query - the update query the user wishes to perform
 * @param dataBase - the database the query is being performed on
 * @param commitResults - whether the user wants the changes to be performed on the database or to only receive the resulting Object
 * @return {Promise<{}|null>} - an empty object, or the database object with the corresponding query change applied.
 */
let execUpdate = async (query, dataBase, commitResults) => {
    let dbRef = {};
    let queryInfo = new QueryInfo();
    try {
        // Configure the QueryInfo Object
        queryInfo.collection = getCollection(query, "update");
        queryInfo.wheres = getWheres(query);
        const sets = await getSets(query, dataBase);
        if (!sets) {
            return null;
        }
        queryInfo.selectFields = Object.keys(sets);
        let select_data = getDataForSelect(queryInfo, dataBase);
        await select_data.then(async (data) => {
            Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {}); // delete any data from the resulting object where the key is undefined
            const payload = generatePayload(data, sets, queryInfo);
            if (payload && commitResults) {
                dbRef = await performUpdate(payload, dataBase, queryInfo, sets) // the user wishes to update fields in the Firebase database
            } else if (payload && !commitResults) {
                dbRef = await execUpdate_commitFalse(payload, dataBase, queryInfo) // the user wishes to see the changes without making changes to the Firebase database
            }
        })
    } catch (err) {
        console.log(err);
    }
    return dbRef;
};

/**
 * Performs to corresponding update query and updates fields on Firebase
 * @param payload - update payload returned from generatePayload()
 * @param dataBase - the database the query is being performed on
 * @param queryInfo
 * @param sets - the query sets showing which keys are changing, and what the new values of the keys will be
 * @return {Promise<void>}
 */
let performUpdate = async (payload, dataBase, queryInfo, sets) => {
    let paths = [];
    Object.keys(payload).forEach(objKey => {
        // for each key that is being changed update that key with the corresponding value
        let updateObj = payload[objKey];
        let path = queryInfo.collection + '/' + objKey; // the path to the value we are changing
        if (!queryInfo.wheres) {
            path = queryInfo.collection;
        }
        paths.push(path);
        updateFields(path, updateObj, Object.keys(sets), dataBase); // perform the update operation in the Firebase database

    });
    return await getReturnObj_Update(paths, dataBase, true, {});
};


let getReturnObj_Update = async (paths, dataBase, commitResults, db_data_ref) => {
    let returnObj = {};
    if (commitResults) {
        await dataBase.ref('/').once('value', function(snapshot) {
            paths.forEach(path => {
                let dataRef = snapshot.val(); // get the current database object
                const pathParts = path.split('/');
                pathParts.forEach((part, index) => {
                    if (dataRef[part]) {
                        if (index < pathParts.length - 1) {
                            dataRef = dataRef[part];
                        } else {
                            returnObj[pathParts[pathParts.length - 1]] = dataRef[pathParts[pathParts.length - 1]];
                        }
                    }
                });
            });
        });
    } else {
        paths.forEach(path => {
            let dataRef = db_data_ref; // get the current database object
            const pathParts = path.split('/');
            pathParts.forEach((part, index) => {
                if (dataRef[part]) {
                    if (index < pathParts.length - 1) {
                        dataRef = dataRef[part];
                    } else {
                        returnObj[pathParts[pathParts.length - 1]] = dataRef[pathParts[pathParts.length - 1]];
                    }
                }
            });
        });
    }
    return returnObj;
};


/**
 * Performs the corresponding update query without changing the data on Firebase
 * @param payload - update payload returned from generatePayload()
 * @param dataBase - the database the query is being performed on
 * @param queryInfo - the collection where we are performing the update
 * @return {Promise<{}>} database object with the corresponding query change applied. Change is NOT reflected on Firebase
 */
let execUpdate_commitFalse = async (payload, dataBase, queryInfo) => {
    let dataRef = {};
    let paths = [];
    await dataBase.ref('/').once('value', function(snapshot) {
        dataRef = snapshot.val(); // get the current database object
        Object.keys(payload).forEach(objKey => {
            // for each key that is being changed update that key with the corresponding value
            let updateObj = payload[objKey]; //
            let path = queryInfo.collection + '/' + objKey; // the path to the value we are changing
            if (objKey === Object.keys(updateObj)[0] && Object.keys(updateObj).length === 1 ) {
                updateObj = updateObj[objKey]
            }
            setAttributeFromPath(path, dataRef ,updateObj);    // here is where the value is changed
            paths.push(path);
        });
    }, function(err) {
        throw new Error("execUpdate(): failed to get the updated database.")
    });
    return await getReturnObj_Update(paths, dataBase, false, dataRef);
};

/**
 * Helper function for updating an object at a given path
 * @param path
 * @param entity
 * @param value
 */
let setAttributeFromPath = (path, entity, value) => {
    const pathParts = path.split('/');
    let obj = entity;
    pathParts.forEach((part, index) => {
        if (obj[part]) {
            if (index < pathParts.length - 1) {
                obj = obj[part];
            } else {
                obj[part] = value;
            }
        }
    });
};


/**
 * generates the payload for the updated entries in the db
 * @param data - the data object this will be performed on
 * @param sets - the query sets showing which keys are changing, and what the new values of the keys will be
 * @param queryInfo
 * @returns: an object where the keys represent the keys to update in the database, and the values are the updated values
 */
let generatePayload = (data, sets, queryInfo) => {
    if (!queryInfo.wheres) {
        const payload = {};
        for (const [key, value] of Object.entries(sets)) {
            const val = {};
            val[key] = value;
            payload[key] = val;
        }
        return payload;
    }
    const payload = {};
    Object.keys(data).forEach(objKey => {
        const updateObj = updateItemWithSets(data[objKey], sets);
        payload[objKey] = updateObj;
    });
    return payload;
};

/**
 *
 * @param obj
 * @param sets
 */
let updateItemWithSets = (obj, sets) => {
    let _ = require('lodash');
    let updateObject = _.clone(obj);
    Object.keys(sets).forEach(objKey => {
        const thisSet = sets[objKey];
        if (objKey.includes("/")) {
            if (typeof updateObject !== "object") {
                updateObject = {};
            }
            let currentObject = updateObject;
            let dataPath = objKey.split("/");
            dataPath.forEach((val, i) => {
                if (i === dataPath.length - 1) {
                    currentObject[val] = thisSet;
                } else {
                    let currVal = currentObject[val];
                    currentObject[val] =
                        currVal && typeof currVal === "object" ? currentObject[val] : {};
                }
                currentObject = currentObject[val];
            });
        } else {
            updateObject[objKey] = thisSet;
        }
    });
    return updateObject;
};
