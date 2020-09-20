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
    // TODO - UPDATE
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

let execUpdate = async (query, dataBase, commitResults) => {
    let dbRef = {};
    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = qp.getCollection(query, "update");
        queryInfo.wheres = qp.getWheres(query);
        const sets = await qp.getSets(query, dataBase);
        if (!sets) {
            return null;
        }
        queryInfo.selectFields = Object.keys(sets);
        let select_data = selectDb.getDataForSelect(queryInfo, dataBase);
        await select_data.then(async (data) => {
            Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
            const payload = generatePayload(data, sets);
            if (payload && commitResults) {
                Object.keys(payload).forEach(objKey => {
                    const updateObj = payload[objKey];
                    const path = queryInfo.collection + '/' + objKey;
                    updateDb.updateFields(path, updateObj, Object.keys(sets), dataBase) // perform the update operation
                });
            } else if (payload && !commitResults) {
                await dataBase.ref('/').once('value', function(snapshot) {
                    dbRef = snapshot.val();
                    Object.keys(payload).forEach(objKey => {
                        const updateObj = payload[objKey];
                        const path = queryInfo.collection + '/' + objKey;
                        setAttributeFromPath(path, dbRef,updateObj);
                    });
                }, function(err) {
                    throw new Error("ExecuteUpdate(): failed to get the updated database.")
                });
            }
            return dbRef;
        })
    } catch (err) {
        console.log(err);
    }
    return dbRef;
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
 * @param data
 * @param sets
 *
 */
let generatePayload = (data, sets) => {
   // TODO - UPDATE
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
    // TODO - UPDATE
    let _ = require('lodash');
    let updateObject = _.clone(obj);
    Object.keys(sets).forEach(objKey => {
        const thisSet = sets[objKey];
        if (objKey.includes("/")) {
            // "users/userId/name" -> users: { userId: { name: ""}}, etc
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
