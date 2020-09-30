const QueryInfo = require("../parser/QueryInfo").QueryInfo;
const qp = require('../parser/queryParser');
const db = require('../dataBase/selectDb');

/**
 *
 * @param query
 * @param dataBase
 */
let executeSelect = (query, dataBase) => {
    let queryInfo = new QueryInfo();

    queryInfo.collection = qp.getCollection(query, 'select');
    queryInfo.orderBys = qp.getOrderBys(query);
    queryInfo.selectFields = qp.getSelectFields(query);
    queryInfo.wheres = qp.getWheres(query);

    return db.getDataForSelect(queryInfo, dataBase);
}

module.exports = {
    executeSelect: executeSelect
}

