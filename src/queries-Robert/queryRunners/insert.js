const qp = require("../parser/queryParser");
const InsertInfo = require("../parser/InsertInfo").InsertInfo;

/**
 *
 * @param query
 * @param dataBase
 * @param commitResults
 */
const executeInsert = (query, dataBase, commitResults) => {

    let insertInfo = new InsertInfo();
    const regex = /insert\s?([0-9]+)?\s*into\s*(.*)\s*(\(.*\))\s*values\s*(\(.*\))/;
    const matches = query.match(regex);

    // get collection, numInserts, keys, values
    if (!isNaN(matches[1]))
        insertInfo.numInserts = +matches[1];
    else
        insertInfo.numInserts = 1;

    insertInfo.collection = qp.getCollection(query, "insert");

    // strip parenthesis and split into array
    insertInfo.keys = matches[2].slice(1, -1).split(",");
    insertInfo.values = matches[3].slice(1, -1).split(",");

};

module.exports = {
    executeInsert: executeInsert
}
