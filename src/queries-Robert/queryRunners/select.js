import QueryInfo from "../parser/QueryInfo";
import {getCollection, getOrderBys, getSelectFields, getWheres} from "../parser/queryParser";
import {getDataForSelect} from '../dataBase/selectDb';

/**
 *
 * @param query
 * @param dataBase
 */
export const executeSelect = (query, dataBase) => {
    let queryInfo = new QueryInfo();

    queryInfo.collection = getCollection(query, 'select');
    queryInfo.orderBys = getOrderBys(query);
    queryInfo.selectFields = getSelectFields(query);
    queryInfo.wheres = getWheres(query);

    return getDataForSelect(queryInfo, dataBase);
}



