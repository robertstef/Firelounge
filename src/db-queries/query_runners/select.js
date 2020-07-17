import queryParser from "../parser/query_parser";
import { getDataForSelect, getDataForSelectAsync } from "../db/select_db";
import QueryDetails from "../models/fbSqlQuery";
import { SELECT_STATEMENT } from "../constants";
import { getConfig } from "../index";

// FBSQL - changed shouldApplyListener default to false, added user parameter
export default function executeSelect(query, user, callback, shouldApplyListener = false) {
  const col = queryParser.getCollection(query, SELECT_STATEMENT);
  const { collection, isFirestore } = queryParser.checkForCrossDbQuery(col);

  let queryDetails = new QueryDetails();
  queryDetails.collection = collection;
  queryDetails.isFirestore = isFirestore;
  queryDetails.orderBys = queryParser.getOrderBys(query);
  queryDetails.selectedFields = queryParser.getSelectedFields(query);
  queryDetails.shouldApplyListener =
    callback && shouldApplyListener ? true : false;

  return new Promise((resolve, reject) => {
    // FBSQL
    queryParser.getWheres(query, async wheres => {
      queryDetails.wheres = wheres;
      if (callback) {
        // FBSQL
        getDataForSelect(queryDetails, results => {
          callback(customizeResults(results));
        },
        user);
      } else {
        // FBSQL
        const results = await getDataForSelectAsync(queryDetails, user);
        resolve(customizeResults(results));
      }
    });
  });
}

const customizeResults = results =>
  getConfig().shouldExpandResults ? results : results.payload;
