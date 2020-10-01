/**
 * @param dataBase
 * @param path
 */
export const deleteObject = (path, dataBase) => {
    // TODO - DELETE
    if (dataBase === undefined) {
        throw new Error("deleteObject(): database is undefined");
    }
    dataBase.ref(path).remove();
};
