import QueryInfo from "../parser/QueryInfo";
const qp = require('../parser/queryParser');

/**
 *
 * @param query
 * @param user
 */
let executeSelect = (query, user) => {
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

export default executeSelect;
