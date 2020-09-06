const QueryInfo = require("../parser/QueryInfo").QueryInfo ;
const qp = require('../parser/queryParser');

/**
 *
 * @param query
 * @param dataBase
 * @param commitResults
 */
let executeDelete = (query, dataBase, commitResults) => {
    // TODO - DELETE
    // we create the query obj
    let queryInfo = new QueryInfo();
    try {
        // configure the query obj
        queryInfo.collection = qp.getCollection(query, 'delete');
        queryInfo.wheres = qp.getWheres(query);

        // might need to do something with shouldCommitResults

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    executeDelete: executeDelete
}
