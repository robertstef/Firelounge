import QueryInfo from "./QueryInfo";

export default class InsertInfo extends QueryInfo {

    /**
     * Construct a new InsertInfo object.
     * @param keys: {Array} - array of keys to be added to the database
     * @param values: {Array} - array of values to be added to the database
     * @param numInserts {Number} - number of times the given keys and values should
     *                              be inserted into the database
     */
    constructor(keys=null, values=null, numInserts=null) {
        super();
        this._keys = keys;
        this._values = values;
        this._numInserts = numInserts;
    }

    /* GETTER METHODS */
    get keys() {
        return this._keys;
    }

    get values() {
        return this._values;
    }

    get numInserts() {
        return this._numInserts;
    }

    /* SETTER METHODS */
    set keys(value) {
        this._keys = value;
    }

    set values(value) {
        this._values = value;
    }

    set numInserts(value) {
        this._numInserts = value;
    }
}