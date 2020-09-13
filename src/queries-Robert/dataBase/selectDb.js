const _ = require("lodash");

/**
 * Executes a Firebase query for a SELECT statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object}
 *
 * @return {Object}: result of Firebase query
 */
const getDataForSelect = (queryInfo, dataBase) => {
    let wheres = queryInfo.wheres;

    if (wheres === null) {
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
const queryEntireRealTimeCollection = async (queryInfo, dataBase) => {
    let collection = queryInfo.collection;

    if (dataBase === undefined || dataBase === null) {
        throw new Error("queryEntireRealTimeCollection(): database is undefined");
    }

    const ref = await dataBase.ref(collection);

    // get data using once so listener automatically detaches
    let snapshot = await ref.once("value");

    // get language specific object representation with val()
    let payload = await snapshot.val();

    if (payload === null) {
        // TODO - just return NULL or have error thrown???
        throw new Error(`queryEntireRealTimeCollection(): the requested object was unable to be" +
            " retrieved from the database or the collection ${collection} does not exist in the
             database`)
    }

    return getSelectedFieldsFromResults(payload, queryInfo);
    // TODO filter based on WHERES if a WHERE statement was included
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
const executeFilteredRealtimeQuery = async (queryInfo, dataBase) => {
    console.log("I should be here");
    const wheres = queryInfo.wheres;
    let result = {};

    for (let where of wheres) {
        let payload;
        switch(where.comparator) {
            case '=':
                payload = await equals(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '!=':
                payload = await notEquals(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '<>':
                payload = await notEquals(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '>=':
                payload = await greaterThanEq(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '>':
                payload = await greaterThan(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '<=':
                payload = await lessThanEq(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case '<':
                payload = await lessThan(queryInfo, dataBase, where);
                await _.merge(result, payload);
                break;
            case 'like':
                break;
            case '!like':
                break;
            default:
                throw new Error("executeFilteredRealTimeQuery(): unrecognized comparator. The following equality" +
                    " operators are supported: =, !=, <>, >, >=, <, <=, like, not like")
        }
    }

    return result;
}

/**
 * Obtains the requested SELECT fields, as specified by
 * queryInfo.selectFields, from the JSON object returned
 * by Firebase and returns a new object containing only the
 * specified fields.
 *
 * @param payload: {JSON} - the data returned by the Firebase query
 * @param queryInfo: {QueryInfo}
 * @throws Error - if field
 * @returns {{}|*}
 */
const getSelectedFieldsFromResults = (payload, queryInfo) => {
    let selectFields = queryInfo.selectFields;

    // we are selecting for all fields
    if (selectFields.length === 1 && selectFields[0] === "*") {
        return payload;
    }

    let result = {};
    for (let field of selectFields) {
        let val = payload[field];
        if (val === undefined) {
            throw new Error(`getSelectedFieldsFromResults(): the field ${field} was not found` +
                ` in the database`);
        }
        result[field] = val;
    }

    return result;
}

/**
 * Executes a Firebase query to obtain the database objects
 * that are equal to the key value pair specified by the
 * inputted WHERE.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specifies the current WHERE statement
 * @returns {Promise<*>}
 */
const equals = async (queryInfo, dataBase, where) => {
    const ref = await dataBase.ref(queryInfo.collection)
        .orderByChild(where.field)
        .equalTo(where.value);

    // get snapshot of data at this reference location (including children)
    const snapshot = await ref.once("value");

    // get JS specific representation of snapshot
    return await snapshot.val();
}

/**
 * Executes a Firebase query to obtain the database
 * objects that are not equal to the key value pair
 * specified by the inputted WHERE.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specifies the current WHERE statement
 * @returns {Promise<*>}
 */
const notEquals = async (queryInfo, dataBase, where) => {
    // get entire collection
    let fullPayload = await queryEntireRealTimeCollection(queryInfo, dataBase);
    
    // get equal collection
    let equalPayload = await equals(queryInfo, dataBase, where);

    // removes equal values from the entire snapshot of the
    // entire database
    const removeEqual = () => {
        Object.keys(equalPayload).forEach((key) => {
            delete fullPayload[key];
        });
    }

    // removes the entries from the entire database that do
    // not contain the field specified by the WHERE statement
    const filterFull = () => {
        Object.keys(fullPayload).forEach((key) => {
            if (fullPayload[key][where.field] === undefined) {
                delete fullPayload[key];
            }
        });
    }

    if (equalPayload !== null && fullPayload !== null) {
        removeEqual();
        filterFull();
        return fullPayload;
    }
    else if (equalPayload === null && fullPayload !== null) {
        filterFull();
        return fullPayload;
    }
    else if (equalPayload !== null && fullPayload === null) {
        return {};
    }
    else {
        return {};
    }
}

/**
 * Executes a Firebase query to obtain the database objects
 * that are greater than or equal to the value specified
 * by the WHERE statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specified the current WHERE statement
 * @returns {Promise<*>}
 */
const greaterThanEq = async (queryInfo, dataBase, where) => {

    const ref = await dataBase.ref(queryInfo.collection)
        .orderByChild(where.field)
        .startAt(where.value);

    // get snapshot of data at this reference location (including children)
    const snapshot = await ref.once("value");

    // get JS specific representation of snapshot
    return await snapshot.val();
}

/**
 * Executes a Firebase query to obtain the database objects
 * that are greater than the value specified by
 * the WHERE statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specified the current WHERE statement
 * @returns {Promise<*>}
 */
const greaterThan = async (queryInfo, dataBase, where) => {

    // get values greater than or equal to and equal to the value
    // specified by the where statement
    let gEqPayload = await greaterThanEq(queryInfo, dataBase, where);
    let eqPayload = await equals(queryInfo, dataBase, where);

    // removes the values that are equal to the value
    // specified by the where statement
    const parseGreaterEq = () => {
        Object.keys(eqPayload).forEach((key) => {
            delete gEqPayload[key];
        });
    }

    if (gEqPayload !== null && eqPayload !== null) {
        parseGreaterEq();
        return gEqPayload;
    }
    else if (gEqPayload === null && eqPayload !== null) {
        return {};
    }
    else if (gEqPayload !== null && eqPayload === null) {
        return gEqPayload;
    }
    else {
        return {};
    }
}

/**
 * Executes a Firebase query to obtain the database objects
 * that are less than or equal to the value specified by
 * the WHERE statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specified the current WHERE statement
 * @returns {Promise<*>}
 */
const lessThanEq = async (queryInfo, dataBase, where) => {

    const ref = await dataBase.ref(queryInfo.collection)
        .orderByChild(where.field)
        .endAt(where.value);

    // get snapshot of data at this reference location (including children)
    const snapshot = await ref.once("value");

    // get JS specific representation of snapshot
    return await snapshot.val();
}

/**
 * Executes a Firebase query to obtain the database objects
 * that are less than the value specified by the WHERE statement.
 *
 * @param queryInfo: {QueryInfo}
 * @param dataBase: {Object} - Firebase database object
 * @param where: {Object} - specified the current WHERE statement
 * @returns {Promise<*>}
 */
const lessThan = async (queryInfo, dataBase, where) => {
    
    // get values greater than or equal to and equal to the value
    // specified by the where statement
    let lEqPayload = await lessThanEq(queryInfo, dataBase, where);
    let eqPayload = await equals(queryInfo, dataBase, where);

    // removes the values that are equal to the value
    // specified by the where statement
    const parseLessEq = () => {
        Object.keys(eqPayload).forEach((key) => {
            delete lEqPayload[key];
        });
    }

    if (lEqPayload !== null && eqPayload !== null) {
        parseLessEq();
        return lEqPayload;
    }
    else if (lEqPayload === null && eqPayload !== null) {
        return {};
    }
    else if (lEqPayload !== null && eqPayload === null) {
        return lEqPayload;
    }
    else {
        return {};
    }
}

module.exports = {
    getDataForSelect: getDataForSelect
}

