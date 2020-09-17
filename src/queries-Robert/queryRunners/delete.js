const QueryInfo = require("../parser/QueryInfo").QueryInfo ;
const qp = require('../parser/queryParser');
const selectDb = require('../dataBase/selectDb');
const deleteDb = require('../dataBase/deleteDb');

/**
 * @param query
 * @param dataBase
 * @param commitResults
 */
let executeDelete = async (query, dataBase, commitResults) => {
    // TODO - DELETE
    let updated_DB = {};

    await execDelete(query, dataBase, commitResults);

    await dataBase.ref('/').once('value', function(snapshot) {
        updated_DB = snapshot.val()
    }, function(err) {
        throw new Error("ExecuteUpdate(): failed to get the updated database.")
    });

    return updated_DB;

};

let execDelete = async (query, dataBase, commitResults) => {
    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = qp.getCollection(query, 'delete');
        queryInfo.wheres = qp.getWheres(query);
        queryInfo.selectFields = ['*'];
        let payload = selectDb.getDataForSelect(queryInfo, dataBase); // use getDataForSelect to determine what we need to delete
        await payload.then((data) => {
            if (data && commitResults){
                if (!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0) {
                    // unfiltered: delete from users.userId
                    deleteDb.deleteObject(queryInfo.collection, dataBase);
                } else {
                    // Use select payload to determine deletes:
                    // entire col: delete from users;
                    // OR filtered: delete from users where age > x;
                    Object.keys(data).forEach(objKey => {
                        if (data[objKey]) {
                            const path = queryInfo.collection + "/" + objKey;
                            deleteDb.deleteObject(path, dataBase);
                        }
                    })
                }
            }
        });
    } catch (err) {
        console.log(err)
    }
};

module.exports = {
    executeDelete: executeDelete
};
