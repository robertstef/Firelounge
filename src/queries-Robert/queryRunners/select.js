import QueryInfo from "../parser/QueryInfo";
const qp = require('../parser/queryParser');

export default function executeSelect(query, user) {
    let queryInfo = new QueryInfo();

    try {
        queryInfo.collection = qp.getCollection(query, 'select');
        queryInfo.orderBys = qp.getOrderBys(query);
        queryInfo.selectFields = qp.getSelectFields(query);
        queryInfo.wheres = qp.getWheres(query);
    } catch (err) {
        console.log(err);
    }
}