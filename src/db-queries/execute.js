import queryParser from "./parser/query_parser";
import executeSelect from "./query_runners/select";
import executeDelete from "./query_runners/delete";
import executeUpdate from "./query_runners/update";
import executeInsert from "./query_runners/insert";

import {
    SELECT_STATEMENT,
    UPDATE_STATEMENT,
    INSERT_STATEMENT,
    DELETE_STATEMENT
} from "./constants";

// FBSQL
export default function executeQuery(query, user, callback, shouldApplyListener) {
    query = queryParser.formatAndCleanQuery(query);
    const statementType = queryParser.determineStatementType(query);

    switch (statementType) {
        case SELECT_STATEMENT:
            // FBSQL
            return executeSelect(query, user, callback, shouldApplyListener);
        case UPDATE_STATEMENT:
            return executeUpdate(query, user, callback);
        case DELETE_STATEMENT:
            return executeDelete(query, callback);
        case INSERT_STATEMENT:
            return executeInsert(query, callback);
        default:
    }
}
