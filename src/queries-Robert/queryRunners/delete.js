const QueryInfo = require("../parser/QueryInfo").QueryInfo ;
const qp = require('../parser/queryParser');
const selectDb = require('../dataBase/selectDb');
const deleteDb = require('../dataBase/deleteDb');

/**
 * @param query
 * @param dataBase
 * @param commitResults
 */
let executeDelete = (query, dataBase, commitResults) => {
    // TODO - DELETE
    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = qp.getCollection(query, 'delete');
        queryInfo.wheres = qp.getWheres(query);
        const payload = selectDb.getDataForSelect(queryInfo, dataBase); // use getDataForSelect to determine what we need to delete
        if (payload && commitResults){
            if (!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0) {
                // unfiltered: delete from users.userId
                deleteDb.deleteObject(queryInfo.collection, dataBase)
            } else {
                // Use select payload to determine deletes:
                // entire col: delete from users;
                // OR filtered: delete from users where age > x;
                Object.keys(payload).forEach(objKey => {
                    const path = queryInfo.collection + "/" + objKey;
                    deleteDb.deleteObject(path, dataBase);
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    executeDelete: executeDelete
}
