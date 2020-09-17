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
        // get start index of collection
        let collectStart = clean_query.indexOf("from ");
        if (collectStart < 0) {
            throw new Error("getCollection(): could not determine collection, missing from statement");
        } else {
            collectStart = collectStart + collectStartOffset;
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
        // TODO - UPDATE
        const updateStartOffset = 6;
        let collectStart = clean_query.indexOf('update ');
        if (collectStart < 0) {
            throw new Error("getCollection(): could not determine collection, missing from statement");
        } else {
            collectStart = collectStart + updateStartOffset;
        }
        let trimmedCol = clean_query.substring(collectStart).trim();
        let collectEnd = trimmedCol.match(/ |;|$/).index;
        let collection = trimmedCol.substring(0, collectEnd);

        // replace "." with "/" if user used dot notation
        collection = qh.replaceAll(collection, /\./, "/");
        collection = qh.stripEncasingSlashes(collection);

        //TODO - there might be a more graceful way to check for situation where there is no collection specified, but SET option is specified
        if (collection.trim().length === 0 || collection === 'set') {
            throw new Error("getCollection(): could not determine collection, missing from statement");
        }
        return collection;
    }
    else if (statementType === 'insert') {
       // TODO - INSERT
    }
    else if (statementType === 'delete') {
        // TODO - DELETE
        let collectStart = clean_query.indexOf("from ");
        if (collectStart < 0) {
            throw new Error("getCollection(): could not determine collection, missing from statement");
        } else {
            collectStart = collectStart + collectStartOffset
        }
        let trimmedCol = clean_query.substring(collectStart).trim();
        let collectEnd = trimmedCol.indexOf(" where"); // assume a where clause
        if (collectEnd < 0) { // if no where clause
            collectEnd = trimmedCol.match(/ |;|$/).index; // set it to the end of the query
            if (collectEnd === 0) { // the collection was not specified (i.e. just the single ";" character)
                throw new Error("getCollection(): could not determine collection, missing from statement");
            }
        }

        let collection = trimmedCol.substring(0, collectEnd);

        // replace "." with "/" if user used dot notation
        collection = qh.replaceAll(collection, /\./, "/");
        collection = qh.stripEncasingSlashes(collection);
        return collection;
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

/**
 * Parses out the select fields from the given
 * SQL select statement. The select fields are
 * defined as:
 *
 * SELECT fields, ... FROM collection
 *
 * @param query: String - query to be parsed
 * @returns {String[]}: array of selected fields
 */
let getSelectFields = (query) => {

    // check if select statement is of valid form
    let regex = /(select\s+)(.*)(\s+from\s+.*)/; //add or delete, and then change the function to something more descriptive.
    let matches = query.match(regex, query);

    if (matches === null) {
        throw new Error("getSelectFields(): SELECT statement must be of the form " +
            "SELECT fields, ... FROM collection, ...");
    }

    // get the fields from the query
    let froms = matches[2];

    // check user entered fields and it was not just whitespace
    if (! froms.replace(/\s/g, '').length) {
        throw new Error("getSelectFields(): SELECT statement must be of the form " +
            "SELECT fields, ... FROM collection, ...");
    }

    // place fields into object
    let fields = froms.split(",");
    let selectedFields = [];
    for (let f of fields) {
        selectedFields.push(f.trim());
    }

    return selectedFields;
}

/**
 * Parses the WHERE statements out of a given SQL statement.
 * Accepted equality operators are: =, !=, <>, >, >=, <, <=, like, not like.
 *
 * An example of a WHERE statement is as follows:
 *
 * SELECT * FROM games WHERE player=Robert
 *
 * The expected return value of this query would be:
 *
 * [{field: "player", comparator: "=", value: "Robert"}]
 *
 * @param query: {String} - query to be parsed
 * @returns {null|{field: String, comparator: String, compVal: {String|number|boolean|null}[]}}
 */
let getWheres = (query) => {

    // find start of where statement
    let whereStart = query.indexOf(" where ");
    if (whereStart < 0) {
        return null;
    }
    else {
        whereStart++;
    }

    // find where WHERE statement ends and ORDER BY starts if an
    // ORDER BY was included in the query
    const orderByStart = query.indexOf("order by");
    const whereEnd = orderByStart >= 0 ? orderByStart : query.length;

    // split up multiple WHERE conditions
    let wheresArr = query.substring(whereStart + 5, whereEnd).split(/\sand\s/);
    //wheresArr[wheresArr.length - 1] = wheresArr[wheresArr.length - 1].replace(";", "");

    // process each individual where statement
    let wheres = [];
    wheresArr.forEach(where => {
        where = where.trim();
        where = qh.replaceAll(where, "not like", "!like");
        let {comparator, index} = qh.determineComparatorAndIndex(where);

        let compVal = where.substring(index + comparator.length).trim();
        if (comparator === 'like' || comparator === '!like') {
            compVal = qh.getParsedValue(compVal, true);
        }
        else {
            compVal = qh.getParsedValue(compVal, false);
        }

        let whereObj = {
            field: where.substring(0, index).trim(),
            comparator: comparator,
            value: compVal
        }

        wheres.push(whereObj);
    });

    return qh.optimizeWheres(wheres);
}

/**
 *
 * @param query
 */
let getInsertCount = (query) => {
    // TODO - INSERT
}

/**
 *
 * @param query
 */
let getObjectsFromInsert = (query) => {
    // TODO - INSERT
    // NOTE: hold off on doing insert based on SELECT data -
    //       function executeSelect is still being developed
}


/**
 * Parses the SET statement from a given UPDATE mySQL statement
 *
 * an example of a query:
 *
 * UPDATE games SET name=Richard WHERE score>20
 *
 * Expected return value
 *
 * {name :  "Richard"}
 *
 * @param query: {String} - query to be parsed
 * @param database
 * @return null|{variable1: String, variable2: String: , ... , variableN: String}
 */
let getSets = async (query, database) => {
    // TODO - UPDATE
    const setIndexStart = query.indexOf(" set ") + 1;
    if (setIndexStart < 1) {
        //if there arent any sets in the query return null
        return null;
    }
    const whereIndexStart = query.indexOf(" where ") + 1;
    let setsArr;
    if (whereIndexStart > 0) {
        setsArr = query.substring(setIndexStart + 3, whereIndexStart).split(", ");
    } else {
        setsArr = query.substring(setIndexStart + 3).split(", ");
        setsArr[setsArr.length - 1] = setsArr[setsArr.length - 1].replace(";", "");
    }
    let sets = {};
    setsArr.forEach(async item => {
        let [key, val] = item.split("=");
        if (key && val) {
            //TODO - EXECUTE A SELECT QUERY AND GET THE RESULTING VALUES
            if (/^\s*\(?(select).+from.+\)?/i.test(val)) { // UPDATE table_name SET=(SELECT id FROM history)...
                let fbsql = require('../execQuery');
                let query = val.substring(1, val.length - 2);
                val = await fbsql.executeQuery(query, database, false);
                val = `${Object.values(val)[0]}`; // get the returned from the select query
            }
            key = key.replace(".", "/").trim();
            sets[key] = qh.getParsedValue(val.trim(), false);
        }
    });
    return sets
};


/* Export statements */
module.exports = {
    formatAndCleanQuery: formatAndCleanQuery,
    determineStatementType: determineStatementType,
    getCollection: getCollection,
    getOrderBys: getOrderBys,
    getSelectFields: getSelectFields,
    getWheres: getWheres,
    getInsertCount: getInsertCount,
    getObjectsFromInsert: getObjectsFromInsert,
    getSets: getSets
}
