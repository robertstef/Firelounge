/**
 *
 * @param path
 * @param object
 * @param fields
 * @param database
 */
let updateFields = (path, object, fields, database) => {
    // TODO - UPDATE
    if (!fields || !object) {
        return;
    }
    if (database === undefined) {
        throw new Error("updateFields(): database is undefined");
    }
    return updateRealTimeFields(database, path, object);
};

const updateRealTimeFields = async function(database, path, newData) {
    return database.ref(path).update(newData);
};


module.exports = {
    updateFields: updateFields,
};
