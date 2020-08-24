import QueryInfo from "../parser/QueryInfo";
const qp = require('../parser/queryParser');

/**
 *
 * @param query
 * @param user
 */
let executeDelete = (query, user) => {
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

export default executeDelete;
