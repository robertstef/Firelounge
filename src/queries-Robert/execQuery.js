import executeSelect from "./queryRunners/select";
import executeUpdate from "./queryRunners/update";
import executeDelete from "./queryRunners/delete";
import executeInsert from "./queryRunners/insert";
const queryParser = require('./parser/queryParser');

/**
 * Executes the given query against the current active
 * database for the given user.
 * @param query: {string} - query to be executed
 * @param user: {User} - current user
 * @param commitResults: {boolean} - indicates if results should be committed to
 *                                   database when performing update, delete,
 *                                   and insert.
 *
 * @return a JSON object representing the result of the query
 */
export default function executeQuery(query, user, commitResults) {
    let clean_query = queryParser.formatAndCleanQuery(query);
    const statementType = queryParser.determineStatementType(clean_query);

    switch (statementType) {
        case "select":
            return executeSelect(query, user);
        case "update":
            return executeUpdate(query, user, commitResults);
        case "delete":
            return executeDelete(query, user, commitResults);
        case "insert":
            return executeInsert(query, user, commitResults);
        case "invalid":
            throw new Error("Invalid SQL query. Query must be of type SELECT, UPDATE, DELETE, or INSERT");
        default:
            throw new Error("executeQuery(): executing default statement, something is very wrong");
    }
}