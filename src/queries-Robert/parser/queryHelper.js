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
            else if (c === '=') {
                return { comparator: '==', index: idx};
            }
            else {
                return { comparator: c, index: idx};
            }
        }
    }

    throw new Error("determineComparatorAndIndex: invalid comparison operator");
}

/* Export statements */
module.exports = {
    replaceAll: replaceAll,
    removeWrappedParenthesis: removeWrappedParenthesis,
    stripEncasingSlashes: stripEncasingSlashes,
    determineComparatorAndIndex: determineComparatorAndIndex
}
