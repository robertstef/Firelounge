import QueryInfo from "../parser/QueryInfo";
const qp = require('../parser/queryParser');
const selectDb = require('../dataBase/selectDb');
const updateDb = require('../dataBase/updateDb');

/**
 *
 * @param query
 * @param dataBase
 * @param commitResults
 */
let executeUpdate = (query, dataBase, commitResults) => {
    // TODO - UPDATE

    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = qp.getCollection(query, "update");
        queryInfo.wheres = qp.getWheres(query);
        const sets = qp.getSets(query);
        if (!sets) {
            return null;
        }
        let data = selectDb.getDataForSelect(queryInfo, dataBase);
        const payload = generatePayload(data, sets);
        if (data && commitResults) {
            Object.keys(data).forEach(objKey => {
                const updateObj = payload[objKey];
                const path = queryInfo.collection + "/" + objKey;
                updateDb.updateFields(path, updateObj, Object.keys(sets), dataBase)
            })
        }
    } catch (err) {
        console.log(err);
    }
};

/**
 *
 * @param data
 * @param sets
 */
let generatePayload = (data, sets) => {
   // TODO - UPDATE
    const payload = {};
    data &&
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

