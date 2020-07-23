const qh = require('./queryHelper');

/**
 * Formats the query by removing instances of "//" and "--",
 * replacing carriage return characters with spaces, trimming
 * leading and trailing whitespace, and removing parenthesis
 * surrounding the query.
 * @param query: String
 * @returns {string|*}: the formatted query
 */
let formatAndCleanQuery = (query) => {
    // remove all comments starting with "//" or "--" with ""
    let clean_query = qh.replaceAll(query, /(\/\/|--).+/g, "");
    // replace carriage return chars with spaces
    clean_query = clean_query.replace(/\r?\n|\r/g, " ");
    // replace multiple spaces with single spaces
    clean_query = clean_query.replace(/ +/g, " ");
    // remove whitespace
    clean_query = clean_query.trim();
    // remove parenthesis
    clean_query = qh.removeWrappedParenthesis(clean_query);
    return clean_query;
}

/**
 * Determines if the given query is of type select,
 * update, insert, delete, or invalid.
 * @param query: String
 * @returns {string}: String indicating the statement type
 *                    Is one of: select, update, insert, delete.
 */
let determineStatementType = (query) => {
    let firstTerm = query
        .split(" ")[0]
        .trim()
        .toLowerCase();

    switch (firstTerm) {
        case "select":
            return "select";
        case "update":
            return "update";
        case "insert":
            return "insert";
        case "delete":
            return "delete";
        default:
            return "invalid";
    }
}

/* Export statements */
module.exports = {
    formatAndCleanQuery: formatAndCleanQuery,
    determineStatementType: determineStatementType
}
