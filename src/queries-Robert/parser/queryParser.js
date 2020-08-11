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
    let clean_query = query.toLowerCase();
    // remove all comments starting with "//" or "--" with ""
    clean_query = qh.replaceAll(query, /(\/\/|--).+/g, "");
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

/**
 * Extracts the collection from the given query. The collection is the portion of
 * the query surrounded by ** ** in the examples below for each query type.
 *
 * select a from **games**
 *
 * NOTES:
 * Select statements: nested selects are not supported. If a nested select query is
 *                    given, the nested selected will be removed from the query.
 *
 * @param query: String representing the query to parse
 * @param statementType: String indicating statement type
 * @returns {string|*}
 */
let getCollection = (query, statementType) => {

    const collectStartOffset = 4;
    const collectStartBeforeSelect = 5;

    // remove nested select statements
    let clean_query = query.replace(/\(.*\)/, ""); // replace selects in () with ""
    clean_query = clean_query.trim(); // trim out nested selects
    clean_query = clean_query.replace(/ +/g, " "); // replace multiple spaces with single spaces

    // separate individual terms in array
    let unclean_terms = clean_query.split(" ");
    let terms = [];

    // remove empty strings from unclean_terms
    for (let t of unclean_terms) {
        if (t !== "") { terms.push(t) }
    }

    if (statementType === 'select') {
        // TODO figure out error conditions from original code
        // not sure what conditions these would apply in
        /*
        if (terms.length === 2 && terms[0] === "from") {
            return strip(stringHelper.replaceAll(terms[1], ".", "/"));
        } else if (terms.length === 1) {
            let collection = terms[0].replace(";", "");
            return strip(stringHelper.replaceAll(collection, /\./, "/"));
        }
        */

        // get start index of collection
        let collectStart = clean_query.indexOf("from ") + collectStartOffset;
        if (collectStart < 0) {
            throw new Error("getCollection(): could not determine collection, missing from statement");
        }

        let trimmedCol = clean_query.substring(collectStart).trim(); // extract collection from query string
        let collectEnd = trimmedCol.match(/ |;|$/).index; // find end of collection
        let collection = trimmedCol.substring(0, collectEnd);

        // replace "." with "/" if user used dot notation
        collection = qh.replaceAll(collection, /\./, "/");
        collection = qh.stripEncasingSlashes(collection);
        return collection;
    }
    else if (statementType === 'update') {
       // do something
    }
    else if (statementType === 'insert') {
       // do something
    }
    else if (statementType === 'delete') {
       // do something
    }
    else {
        throw new Error("getCollection(): invalid statement type. Must be one of select, update, insert" +
            ", or delete");
    }
}


/**
 * Parses the ORDER BY statement within a SELECT query.
 * Returns an array of objects indicating with each object
 * indicating the column name to order by and a boolean value
 * indicating if the column is to be sorted in ascending or
 * descending order.
 *
 * @param query: String - query to be parsed
 * @returns {{colName: string, ascending: boolean}[]|null}
 */
let getOrderBys = (query) => {
    const ORDER_BY = "order by";
    const ASC = 'asc';
    const DESC = "desc";

    // check if query contains order by statement
    let idx = query.indexOf(ORDER_BY);

    if (idx < 0) {
        return null;
    }

    // extract order bys from query
    let orderByStr = query.substring(idx + ORDER_BY.length);
    let orderByList = orderByStr.split(",");

    return orderByList.map(orderBy => {
        let cur = orderBy.trim(); // current orderBy
        cur = cur.split(" ");

        // check individual order by is of the form colName ASC|DESC
        // note: ASC|DESC can be left out, query defaults to ASC
        if (cur.length === 0 || cur.length > 2) {
            throw new Error("getOrderBys(): ORDER BY statement must be of the form: " +
                "ORDER BY col1, col2, ... ASC|DESC");
        }

        // if ASC|DESC included - check user typed ASC|DESC, else throw error
        if (cur.length === 2) {
            if ((cur[1] !== ASC) && (cur[1] !== DESC)) {
                throw new Error("getOrderBys(): ORDER BY statement must be of the form: " +
                    "ORDER BY col1, col2, ... ASC|DESC");
            }
        }

        // no ASC|DESC specified - default to ASC
        if (cur.length === 1) {
            return {
                ascending: true,
                colName: cur[0]
            }
        }
        else {
            // user specified sorting DESC
            if (cur[1] === DESC) {
                return {
                    ascending: false,
                    colName: cur[0]
                }
            }
            // user specified sorting ASC
            else {
                return {
                    ascending: true,
                    colName: cur[0]
                }
            }
        }
    });
}


let getSelectFields = (query) => {

}
/* Export statements */
module.exports = {
    formatAndCleanQuery: formatAndCleanQuery,
    determineStatementType: determineStatementType,
    getCollection: getCollection,
    getOrderBys: getOrderBys
}
