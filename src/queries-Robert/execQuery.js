import executeSelect from "./queryRunners/select";
import executeUpdate from "./queryRunners/update";
import executeDelete from "./queryRunners/delete";
import executeInsert from "./queryRunners/insert";
const queryParser = require('./parser/queryParser');

/**
 * Executes the given query against the current active
 * database for the given user.
 * @param query: String - query to be executed
 * @param user: User object
 *
 * @return a JSON object representing the query
 */
export default function executeQuery(query, user) {
    let clean_query = queryParser.formatAndCleanQuery(query);
    const statementType = queryParser.determineStatementType(clean_query);

    switch (statementType) {
        case "select":
            return executeSelect(query, user);
        case "update":
            return executeUpdate(query, user);
        case "delete":
            return executeDelete(query, user);
        case "insert":
            return executeInsert(query, user);
        case "invalid":
            throw new Error("Invalid SQL query. Query must be of type SELECT, UPDATE, DELETE, or INSERT");
        default:
            throw new Error("executeQuery(): executing default statement, something is very wrong");
    }
}