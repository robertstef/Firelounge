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
    let updated_DB = {};
    let db_ref;

    query = query.replace(/(\r\n|\n|\r)/gm, " "); // filter out potential newline character

    db_ref = await execDelete(query, dataBase, commitResults);
    if (commitResults) {
        await dataBase.ref('/').once('value', function(snapshot) {
            updated_DB = snapshot.val()
        }, function(err) {
            throw new Error("ExecuteUpdate(): failed to get the updated database.")
        });
        return updated_DB;
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
                await performDelete(data, dataBase, queryInfo)
            } else if (data && !commitResults) {
                dataRef = await getUpdatedObj_commitFalse(data, dataBase, queryInfo)
            }
        });
    } catch (err) {
        console.log(err)
    }
    return dataRef;
};

let performDelete = (data, dataBase, queryInfo) => {
    if (!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0) {
        deleteObject(queryInfo.collection, dataBase);
    } else {
        Object.keys(data).forEach(objKey => {
            if (data[objKey]) {
                const path = queryInfo.collection + "/" + objKey;
                deleteObject(path, dataBase);
            }
        })
    }
};

let getUpdatedObj_commitFalse = async (data, dataBase, queryInfo) => {
    let dataRef = {};
    await dataBase.ref('/').once('value', function(snapshot) {
        dataRef = snapshot.val(); // get the current database object
        if ((!queryInfo.wheres && queryInfo.collection.indexOf('/') > 0)) {
            deleteValueFromPath(queryInfo.collection, dataRef);
        } else {
            Object.keys(data).forEach(objKey => {
                if (data[objKey]) {
                    const path = queryInfo.collection + "/" + objKey;
                    deleteValueFromPath(path, dataRef)
                }
            })
        }
    }, function(err) {
        throw new Error("execUpdate(): failed to get the updated database.")
    });
    return dataRef;
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
