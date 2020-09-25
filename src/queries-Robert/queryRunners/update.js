const QueryInfo = require("../parser/QueryInfo").QueryInfo;
const qp = require('../parser/queryParser');
const selectDb = require('../dataBase/selectDb');
const updateDb = require('../dataBase/updateDb');

// UPDATE table_name SET field1 = new-value1, field2 = new-value2
// [WHERE Clause]

/**
 *
 * @param query
 * @param dataBase
 * @param commitResults
 */
let executeUpdate = async (query, dataBase, commitResults) => {
    let updated_DB = {};
    let db_ref;
    db_ref = await execUpdate(query, dataBase, commitResults);
    if (commitResults) {
        // if the user wishes to commit the results to the firebase database
        await dataBase.ref('/').once('value', function(snapshot) {
            updated_DB = snapshot.val()
        }, function(err) {
            throw new Error("ExecuteUpdate(): failed to get the updated database.")
        });
        return updated_DB;
    } else {
        // the user only wishes to see the changes without actually changing the firebase db
        return db_ref
    }
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
        queryInfo.collection = qp.getCollection(query, "update");
        queryInfo.wheres = qp.getWheres(query);
        const sets = await qp.getSets(query, dataBase);
        if (!sets) {
            return null;
        }
        queryInfo.selectFields = Object.keys(sets);
        let select_data = selectDb.getDataForSelect(queryInfo, dataBase);
        await select_data.then(async (data) => {
            Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {}); // delete any data from the resulting object where the key is undefined
            const payload = generatePayload(data, sets, queryInfo);
            if (payload && commitResults) {
                await performUpdate(payload, dataBase, queryInfo, sets) // the user wishes to update fields in the Firebase database
            } else if (payload && !commitResults) {
                dbRef = await getUpdatedObject_commitFalse(payload, dataBase, queryInfo) // the user wishes to see the changes without making changes to the Firebase database
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
    Object.keys(payload).forEach(objKey => {
        // for each key that is being changed update that key with the corresponding value
        const updateObj = payload[objKey];
        const path = queryInfo.collection + '/' + objKey; // the path to the value we are changing
        updateDb.updateFields(path, updateObj, Object.keys(sets), dataBase) // perform the update operation in the Firebase database
    });
};
/**
 * Performs the corresponding update query without changing the data on Firebase
 * @param payload - update payload returned from generatePayload()
 * @param dataBase - the database the query is being performed on
 * @param queryInfo - the collection where we are performing the update
 * @return {Promise<{}>} database object with the corresponding query change applied. Change is NOT reflected on Firebase
 */
let getUpdatedObject_commitFalse = async (payload, dataBase, queryInfo) => {
    let dataRef = {};
    await dataBase.ref('/').once('value', function(snapshot) {
        dataRef = snapshot.val(); // get the current database object
        Object.keys(payload).forEach(objKey => {
            // for each key that is being changed update that key with the corresponding value
            let updateObj = payload[objKey]; //
            if (objKey === Object.keys(updateObj)[0] && Object.keys(updateObj).length === 1 ) {
                updateObj = updateObj[objKey]
            }
            const path = queryInfo.collection + '/' + objKey; // the path to the value we are changing
            setAttributeFromPath(path, dataRef ,updateObj);    // here is where the value is changed
        });
    }, function(err) {
        throw new Error("execUpdate(): failed to get the updated database.")
    });
    return dataRef;
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

module.exports = {
    executeUpdate: executeUpdate
};
