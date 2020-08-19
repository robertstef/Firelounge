export default class QueryInfo {

    /**
     * Constructs a queryInfo object.
     *
     * @param collection: {String|null}
     * @param orderBys: {{colName: string, ascending: boolean}[]|null}
     * @param selectFields: {{fieldName: boolean, ...}}
     * @param wheres:{null|{field: String, comparator: String, compVal: {String|number|boolean|null}
     */
    constructor(collection=null, orderBys=null, selectFields=null, wheres=null) {
        this._collection = collection;
        this._orderBys = orderBys;
        this._selectFields = selectFields;
        this._wheres = wheres;
    }

    /* GETTER METHODS */
    get collection() {
        return this._collection;
    }

    get orderBys() {
        return this._orderBys;
    }

    get selectFields() {
        return this._selectFields;
    }

    get wheres() {
        return this._wheres;
    }

    /* SETTER METHODS */
    set wheres(value) {
        this._wheres = value;
    }

    set collection(value) {
        this._collection = value;
    }

    set orderBys(value) {
        this._orderBys = value;
    }

    set selectFields(value) {
        this._selectFields = value;
    }
}