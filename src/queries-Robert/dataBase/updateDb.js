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
    return updateRealTimeFields(database, path, object, fields);
};

const updateRealTimeFields = function(db, path, newData, fields) {
    let updateObject = {};
    fields.forEach(field => {
        updateObject[field] = newData[field];
    });
    return db.ref(path).update(updateObject);
};


module.exports = {
    updateFields: updateFields,
};
