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

/* Export statements */
module.exports = {
    replaceAll: replaceAll,
    removeWrappedParenthesis: removeWrappedParenthesis
}
