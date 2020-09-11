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

    await execUpdate(query, dataBase, commitResults);

    await dataBase.ref('/').once('value', function(snapshot) {
        updated_DB = snapshot.val()
    }, function(err) {
        throw new Error("ExecuteUpdate(): failed to get the updated database.")
    });

    return updated_DB;
};

let execUpdate = async (query, dataBase, commitResults) => {
    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = qp.getCollection(query, "update");
        queryInfo.wheres = qp.getWheres(query);
        const sets = qp.getSets(query);
        if (!sets) {
            return null;
        }
        queryInfo.selectFields = Object.keys(sets);
        let select_data = selectDb.getDataForSelect(queryInfo, dataBase);
        await select_data.then((data) => {
            const payload = generatePayload(data, sets);
            if (payload && commitResults) {
                Object.keys(payload).forEach(objKey => {
                    const updateObj = payload[objKey];
                    const path = queryInfo.collection;
                    updateDb.updateFields(path, updateObj, Object.keys(sets), dataBase) // perform the update operation
                });
            }
        })
    } catch (err) {
        console.log(err);
    }
};

/**
 * @param data
 * @param sets
 *
 *  Example:
 *      Payload data =  { Jackson: 20, Robert: 15 }
 *      Payload sets =  { Jackson: 6666, Robert: 333 }
 *
 *  Should result in:
 *      Payload = {Jackson: {Jackson : 6666},
 *                 Robert: {Robert: 333}}
 *
 *
 */
let generatePayload = (data, sets) => {
   // TODO - UPDATE
    const payload = {};
    Object.keys(data).forEach(objKey => {
        let item = {};
        const updateObj = updateItemWithSets(data, sets);
        item[objKey] = updateObj[objKey];
        payload[objKey] = item;
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
