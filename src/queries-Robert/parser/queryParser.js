import {
    SELECT_STATEMENT,
    UPDATE_STATEMENT,
    INSERT_STATEMENT,
    DELETE_STATEMENT,
    INVALID_STATEMENT,
    NO_EQUALITY_STATEMENTS
} from "../statementTypes";

const qh = require('./queryHelper');


module.exports = {

    /**
     * Formats the query by removing instances of "//" and "--",
     * replacing carriage return characters with spaces, trimming
     * leading and trailing whitespace, and removing parenthesis
     * surrounding the query.
     * @param query: String
     * @returns {string|*}: the formatted query
     */
    formatAndCleanQuery: (query) => {
        // replace instances of "//" or "--" with ""
        let clean_query = qh.replaceAll(query, /(\/\/|--).+/, "");
        // replace carriage return chars with spaces
        clean_query = clean_query.replace(/\r?\n|\r/g, " ");
        // remove whitespace
        clean_query = clean_query.trim();
        // remove parenthesis
        clean_query = qh.removeWrappedParenthesis(clean_query);
        return clean_query;
    },

    determineStatementType: (query) => {
        let q = query.trim();
        let firstTerm = q
            .split(" ")[0]
            .trim()
            .toLowerCase();

        switch (firstTerm) {
            case "select":
                return SELECT_STATEMENT;
            case "update":
                return UPDATE_STATEMENT;
            case "insert":
                return INSERT_STATEMENT;
            case "delete":
                return DELETE_STATEMENT;
            default:
                return INVALID_STATEMENT;
        }
    }
}