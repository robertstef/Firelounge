import QueryInfo from "../parser/QueryInfo";
import {getCollection, getWheres} from "../parser/queryParser";
import {getDataForSelect} from '../dataBase/selectDb';
import {deleteObject} from '../dataBase/deleteDb';


/**
 * @param query
 * @param dataBase
 * @param commitResults
 */
export const executeDelete = async (query, dataBase, commitResults) => {
    // TODO - DELETE
    let db_ref;

    query = query.replace(/(\r\n|\n|\r)/gm, " "); // filter out potential newline character

    db_ref = await execDelete(query, dataBase, commitResults);
    if (commitResults) {
        return db_ref;
    } else {
        return db_ref;
    }

};

let execDelete = async (query, dataBase, commitResults) => {
    let dataRef = {};
    let queryInfo = new QueryInfo();
    try {
        queryInfo.collection = getCollection(query, 'delete');
        queryInfo.wheres = getWheres(query);
        queryInfo.selectFields = ['*'];
        let payload = getDataForSelect(queryInfo, dataBase); // use getDataForSelect to determine what we need to delete
        await payload.then(async (data) => {
            if (data && commitResults){
                dataRef = await performDelete(data, dataBase, queryInfo)
            } else if (data && !commitResults) {
                dataRef = await execDelete_commitFalse(data, dataBase, queryInfo)
            }
        });
    } catch (err) {
        console.log(err)
    }
    return dataRef;
};

let performDelete = async (data, dataBase, queryInfo) => {
    let paths = [];
    if (!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0) {
        deleteObject(queryInfo.collection, dataBase);
        paths.push(queryInfo.collection)
    } else {
        Object.keys(data).forEach(objKey => {
            if (data[objKey]) {
                const path = queryInfo.collection + "/" + objKey;
                deleteObject(path, dataBase);
                paths.push(path)
            }
        })
    }

    return await getReturnObj_Delete(paths, dataBase, true, {});
};

let execDelete_commitFalse = async (data, dataBase, queryInfo) => {
    let dataRef = {};
    let paths = [];
    await dataBase.ref('/').once('value', function(snapshot) {
        dataRef = snapshot.val(); // get the current database object
        if ((!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0)) {
            deleteValueFromPath(queryInfo.collection, dataRef);
            paths.push(queryInfo.collection);
        } else {
            Object.keys(data).forEach(objKey => {
                if (data[objKey]) {
                    const path = queryInfo.collection + "/" + objKey;
                    deleteValueFromPath(path, dataRef);
                    paths.push(path);
                }
            })
        }
    }, function(err) {
        throw new Error("execUpdate(): failed to get the updated database.")
    });
    return await getReturnObj_Delete(paths, dataBase, false, dataRef);
};

let getReturnObj_Delete = async (paths, dataBase, commitResults, db_data_ref) => {
    let returnObj = {};
    if (commitResults) {
        await dataBase.ref('/').once('value', function(snapshot) {
            paths.forEach(path => {
                let dataRef = snapshot.val(); // get the current database object
                const pathParts = path.split('/');
                pathParts.pop();
                pathParts.forEach((part, index) => {
                    if (dataRef[part]) {
                        if (index < pathParts.length - 1) {
                            dataRef = dataRef[part];
                        } else {
                            returnObj[pathParts[pathParts.length - 1]] = dataRef[pathParts[pathParts.length - 1]];
                        }
                    }
                });
            });
        });
    } else {
        paths.forEach(path => {
            let dataRef = db_data_ref; // get the current database object
            const pathParts = path.split('/');
            pathParts.pop();
            pathParts.forEach((part, index) => {
                if (dataRef[part]) {
                    if (index < pathParts.length - 1) {
                        dataRef = dataRef[part];
                    } else {
                        // reached the end of the path
                        returnObj[pathParts[pathParts.length - 1]] = dataRef[pathParts[pathParts.length - 1]];
                    }
                }
            });
        });
    }
    return returnObj;
};

/**
 * Helper function for updating an object at a given path
 * @param path
 * @param entity
 * @param value
 */
let deleteValueFromPath = (path, entity) => {
    const pathParts = path.split('/');
    let obj = entity;
    pathParts.forEach((part, index) => {
        if (obj[part]) {
            if (index < pathParts.length - 1) {
                obj = obj[part];
            } else {
                delete obj[part];
            }
        }
    });
};
