let regexIndexOf = (string, regex, startpos) => {
    let substr = string.substring(startpos || 0);
    let indexOf = substr.search(regex);

    if (indexOf >= 0) {
        return indexOf + (startpos || 0);
    } else {
        return indexOf;
    }
}

/**
 * Replaces the substring matching the given
 * given regex within string with replacement.
 * @param string: String
 * @param regex: Regex
 * @param replacement: String
 * @returns {String}: the modified string
 */
let replaceAll = (string, regex, replacement) => {
    return string.replace(new RegExp(regex, "g"), replacement);
}

/**
 * Removes parenthesis surrounding the query.
 * @param query: String
 * @returns {string|*}: query with parenthesis removed
 */
let removeWrappedParenthesis = (query) => {
    if (/^\(.+\)$/.test(query)) {
        return query.substring(1, query.length - 1);
    } else {
        return query;
    }
}

/**
 * Removes leading and or trailing slashes from a query.
 *
 * users/ => users, /users => users, users => users, / => /
 * @param query: String representing the query
 * @returns {string|*}: new query with encasing slashes stripped
 */
// TODO: write unit tests for stripEncasingSlashes
let stripEncasingSlashes = (query) => {
    if (query === "/") {
        return query;
    }
    else {
        let start = 0;
        let end = query.length;
        if (query.indexOf("/") === 0) {
            start++;
        }
        if (query.charAt(end - 1) === "/") {
            end--;
        }
        return query.substring(start, end);
    }
}

/**
 * Determines the type of comparison operator and the start
 * index of the comparison operator for a given WHERE statement.
 *
 * BUG: if the user input an incorrect operator that contains the '='
 *      character, such as ==!, the function will still parse it as
 *      an '='.
 *
 * @param where: String - where statement to be parsed
 * @returns {{comparator: string, index: *}}
 */
let determineComparatorAndIndex = (where) => {
    let comparators = ['!=', '<>', '>=', '>', '<=', '<', '!like', 'like', '='];

    for (let c of comparators) {
        let idx = where.indexOf(c);

        if (idx > 0) {
            if (c === '!=' || c === '<>') {
                return { comparator: '!=', index: idx};
            }
            else {
                return { comparator: c, index: idx};
            }
        }
    }

    throw new Error("determineComparatorAndIndex: invalid comparison operator");
}

/**
 * Parses the comparision value from an individual WHERE statement.
 * The comparison value is the value to the right of the comparision
 * operator. In the below example the comparision value is 2.
 *
 * E.g. "WHERE name >= 2" => will return the number 2.
 *
 * The function handles inputs of numbers, boolean values, strings,
 * LIKE wildcards, and null.
 *
 * @param whereValue: {String} - WHERE comparison value
 * @param isLike: {boolean}: indicates if the whereValue is a LIKE wildcard
 * @returns {null|boolean|number|String}
 */
let getParsedValue = (whereValue, isLike) => {
    // input is a like wildcard
    if (isLike) {
        return whereValue.replace(/["']/g, "");
    }
    // input is a number
    else if (!isNaN(whereValue)) {
        return parseFloat(whereValue);
    }
    // input is boolean
    else if (whereValue === 'true' || whereValue === 'false') {
        return whereValue === 'true';
    }
    // input is null
    else if (whereValue === 'null') {
        return null;
    }
    // input is a string value
    else {
       return whereValue.trim();
    }
}

/**
 * Rearranges and array of WHERE objects such that the first
 * object contains the '=' comparator. If the array does not
 * contain a '=' comparator the array will be returned unchanged.
 *
 * A WHERE object is an object of the following form:
 *
 * {
 *     field: {String}
 *     comparator: {String}
 *     value: {number|boolean|String}
 * }
 *
 * @param wheres: {Array}: An array of WHERE objects
 * @returns {Array}: array of WHERE objects
 */
let optimizeWheres = (wheres) => {
    // first term is '=', where done!
    if (wheres[0].comparator === '=') {
        return wheres;
    }
    else {
        // find first '=' and swap with 0th element
        for (let i = 1; i < wheres.length; i++) {
            if (wheres[i].comparator === '=') {
                [wheres[0], wheres[i]] = [wheres[i], wheres[0]];
                break;
            }
        }
        return wheres;
    }
}


/* Export statements */
module.exports = {
    replaceAll: replaceAll,
    removeWrappedParenthesis: removeWrappedParenthesis,
    stripEncasingSlashes: stripEncasingSlashes,
    determineComparatorAndIndex: determineComparatorAndIndex,
    getParsedValue: getParsedValue,
    optimizeWheres: optimizeWheres
}
