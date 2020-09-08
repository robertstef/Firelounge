/**
 *
 * @param path
 * @param object
 * @param fields
 * @param user
 */
let updateFields = (path, object, fields, user) => {
    // TODO - UPDATE
    if (!fields || !object) {
        return;
    }
    let db = user.db_object;
    if (db === undefined) {
        throw new Error("updateFields(): database is undefined");
    }
    return updateRealTimeFields(db, path, object, fields);
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
