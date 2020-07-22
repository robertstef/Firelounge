import {
    SELECT_STATEMENT,
    UPDATE_STATEMENT,
    INSERT_STATEMENT,
    DELETE_STATEMENT,
    INVALID_STATEMENT,
    NO_EQUALITY_STATEMENTS
} from "./statementTypes";

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
        case SELECT_STATEMENT:
            break;
        case UPDATE_STATEMENT:
            break;
        case DELETE_STATEMENT:
            break;
        case INSERT_STATEMENT:
            break;
        case INVALID_STATEMENT:
            throw new Error("Invalid SQL query. Query must be of type SELECT, UPDATE, DELETE, or INSERT");
        default:
            throw new Error("executeQuery(): executing default statement, something is very wrong");
    }
}