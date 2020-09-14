/**
 * @param dataBase
 * @param path
 */
let deleteObject = (path, dataBase) => {
    // TODO - DELETE
    if (dataBase === undefined) {
        throw new Error("deleteObject(): database is undefined");
    }
    dataBase.ref(path).remove();
};


module.exports = {
    deleteObject: deleteObject
}
