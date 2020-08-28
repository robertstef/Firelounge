/**
 *
 * @param queryInfo
 * @param user: {User}
 */
let getDataForSelect = (queryInfo, user) => {
    let wheres = queryInfo.wheres;
    let selectFields = queryInfo.selectFields;

    // get db ref from user object
    let db = user.db_object;

    // user.db_object to get active db for call to ref
    // user try catch on ref to make sure there are no issues

    if (wheres === null || wheres[0] !== '=') {

    }

}

let queryEntireRealTimeCollection = (queryInfo, user) => {
    let collection = queryInfo.collection;
    let selectFields = queryInfo.selectFields;

    //const ref =
}