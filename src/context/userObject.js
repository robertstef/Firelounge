export class User {

    /**
     * Creates a new User object.
     * @param uname: users username
     * @param projs: users current firelounge projects in an
     *               object of the form:
     *               {name: "", path: "", ... }
     * @param fb_projs: users current firebase projects in an
     *                  array of the form:
     *                  [{display_name: "", id: "", number: ""}, ...]
     */
    constructor(uname, projs, fb_projs) {
        this._act_proj = projs[0]; // active project
        this._uname = uname;       // user name
        this._projs = projs;       // firelounge projects
        this._fb_projs = fb_projs; // firebase projects
    }

    /* Getters for each instance variable */
    get uname() { return this._uname; }

    get projs() { return this._projs; }

    get fb_projs() { return this._fb_projs; }

    get act_proj() { return this._act_proj; }

    /**
     * Sets the users current active project.
     *
     * @param new_active: new active project in an object
     *                    of the form:
     *                    {name: "", path: ""}
     */
    setActive(new_active) {
        if ( (new_active.name === undefined) || (new_active.path === undefined) ) {
            throw new Error("Input for setActive must be of the form {name:\"\", path:\"\"} ")
        }
        else if (! this._projsInclude(new_active)) {
            throw new Error("The inputted project does not exist in firelounge");
        }
        this._act_proj = new_active;
    }

    /**
     * Adds a new project the firelounge. Throws an error if
     * the project already exists in firelounge
     *
     * @param new_proj: project to be added in an object of
     *                  the form:
     *                  {name: "", path: ""}
     */
    addProj(new_proj) {
        if ( (new_proj.name === undefined) || (new_proj.path === undefined) ) {
            throw new Error("Input for addProj must be of the form {name:\"\", path:\"\"} ")
        }
        else if (this._projsInclude(new_proj)) {
            throw new Error("This project already exists in firelounge");
        }
        else {
            this._projs.push(new_proj)
        }
    }

    /**
     * Removes a project from firelounge. Throws an error if
     * the project does not exist in firelounge.
     *
     * @param old_proj: project to be removed in an object
     *                  of the form:
     *                  {name:"", path:""}
     */
    removeProj(old_proj) {
        if ( (old_proj.name === undefined) || (old_proj.path === undefined) ) {
            throw new Error("Input for addProj must be of the form {name:\"\", path:\"\"} ")
        }
        else if ( ! this._projsInclude(old_proj)) {
            throw new Error("This project does not exist in firelounge");
        }
        else {
            const idx = this._projs.indexOf(old_proj);
            this._projs.slice(idx, 1);
        }
    }

    /**
     * Checks if two objects of the form: {name: "", path: "", id: ""}
     * are of equal value.
     * @param a: first object to compare
     * @param b: second object to compare
     * @returns {boolean}: true if equal, false if not
     */
    static _isEqual(a, b) {
        return ((a.name === b.name) || (a.path === b.path) || (a.id === b.id));
    }

    /**
     * Checks if this._projs contains the given object.
     * @param comp: the object to be search for of the form:
     *              {name:"", path:"", id:""}
     * @returns {boolean}: true if found, false if not
     * @private
     */
     _projsInclude(comp) {
        for (let p of this._projs) {
            if (User._isEqual(comp, p)) { return true }
        }
        return false;
    }
}
