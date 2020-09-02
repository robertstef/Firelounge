/**
 * Executes a Firebase query for a SELECT statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param user: {User}
 *
 * @return {Object}: result of Firebase query
 */
let getDataForSelect = (queryInfo, user) => {
    let wheres = queryInfo.wheres;

    if (wheres === null || wheres[0] !== '=') {
        return queryEntireRealTimeCollection(queryInfo, user);
    }
    else {
        return executeFilteredRealtimeQuery(queryInfo, user);
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

/**
 * Executes a Firebase query where the user has specified
 * specific parameters using a WHERE statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param user: {User}
 *
 * @returns {Object}: result of Firebase query
 */
let executeFilteredRealtimeQuery = (queryInfo, user) => {
    const wheres = queryInfo.wheres;
    const collection = queryInfo.collection;
    const selectFields = queryInfo.selectFields;

    const db = user.db_object;
    const ref = db.ref(collection)
                  .orderByChild(wheres[0].field)
                  .equalTo(wheres[0].value);

    ref.once("value")
        .then((snapshot) => {
            let payload = snapshot.val();
            // TODO filter out where statements and non selected fields
            // return filterWheresAndNonSelectedFields
        });
}

module.exports = {
    getDataForSelect: getDataForSelect
}

