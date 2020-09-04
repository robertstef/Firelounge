/**
 * Executes a Firebase query for a SELECT statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object}
 *
 * @return {Object}: result of Firebase query
 */
let getDataForSelect = (queryInfo, dataBase) => {
    let wheres = queryInfo.wheres;

    if (wheres === null || wheres[0] !== '=') {
        return queryEntireRealTimeCollection(queryInfo, dataBase);
    }
    else {
        return executeFilteredRealtimeQuery(queryInfo, dataBase);
    }

}

/**
 * Used to retrieve the entire collection from Firebase. If the query
 * request specific fields (i.e. anything other than "*") the result
 * is filtered to contain only the fields specified by the select
 * statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object}
 *
 * @return {JSON}: filtered query as return by Firebase
 */
let queryEntireRealTimeCollection = (queryInfo, dataBase) => {
    let collection = queryInfo.collection;
    let selectFields = queryInfo.selectFields;

    if (dataBase === undefined || dataBase === null) {
        throw new Error("queryEntireRealTimeCollection(): database is undefined");
    }

    const ref = dataBase.ref(collection);

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
 * @param dataBase: {User}
 *
 * @returns {Object}: result of Firebase query
 */
let executeFilteredRealtimeQuery = (queryInfo, dataBase) => {
    const wheres = queryInfo.wheres;
    const collection = queryInfo.collection;

    const ref = dataBase.ref(collection)
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

