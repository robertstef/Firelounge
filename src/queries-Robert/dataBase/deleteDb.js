/**
 * @param user
 * @param path
 */
let deleteObject = (path, user) => {
    // TODO - DELETE
    const db = user.db_object;
    if (db === undefined) {
        throw new Error("deleteObject(): database is undefined");
    }
    db.ref(path).remove();
};


module.exports = {
    deleteObject: deleteObject
}
