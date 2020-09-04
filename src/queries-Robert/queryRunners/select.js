import QueryInfo from "../parser/QueryInfo";
const qp = require('../parser/queryParser');
const db = require('../dataBase/selectDb');

/**
 *
 * @param query
 * @param dataBase
 */
let executeSelect = (query, dataBase) => {
    let queryInfo = new QueryInfo();

    try {
        queryInfo.collection = qp.getCollection(query, 'select');
        queryInfo.orderBys = qp.getOrderBys(query);
        queryInfo.selectFields = qp.getSelectFields(query);
        queryInfo.wheres = qp.getWheres(query);
    } catch (err) {
        console.log(err);
    }

    return db.getDataForSelect(queryInfo, dataBase);
}

export default executeSelect;
