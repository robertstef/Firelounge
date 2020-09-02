/**
 *
 * @param queryInfo
 * @param user: {User}
 */
let getDataForSelect = (queryInfo, user) => {
    let wheres = queryInfo.wheres;
    let selectFields = queryInfo.selectFields;

    if (wheres === null || wheres[0] !== '=') {
        return queryEntireRealTimeCollection(queryInfo, user);
        // queryEntireRealTimeCollection
    }
    else {
        // executeFilteredRealTimeQuery
    }

}


/**
 * Used to retrieve the entire collection from Firebase. If the query
 * request specific fields (i.e. anything other than "*") the result
 * is filtered to contain only the fields specified by the select
 * statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param user: {User}
 *
 * @return {JSON}: filtered query as return by Firebase
 */
let queryEntireRealTimeCollection = (queryInfo, user) => {
    let collection = queryInfo.collection;
    let selectFields = queryInfo.selectFields;

    // get db from user object
    let db = user.db_object;

    if (db === undefined) {
        throw new Error("queryEntireRealTimeCollection(): database is undefined");
    }

    const ref = db.ref(collection);

    // get data using once so listener automatically detaches
    ref.once("value")
        .then((snapshot) => {
            // get language specific object rep with .val()
            let payload = snapshot.val();
            if (selectFields) {
                // TODO remove non selected fields from results
                // payload = removeNonSelectedFieldsFromResults(payload, queryInfo);
            }
            return payload;
    });
}

module.exports = {
    getDataForSelect: getDataForSelect
}

