let getDataForSelect = (queryInfo, user) => {
    let wheres = queryInfo.wheres;
    let selectFields = queryInfo.selectFields;

    // get db ref from user object
    let db = user.data_baby; // TODO do this a better way

    if (wheres === null || wheres[0] !== '=') {

    }

}

let queryEntireRealTimeCollection = (queryInfo, user) => {
    let collection = queryInfo.collection;
    let selectFields = queryInfo.selectFields;

    //const ref =
}