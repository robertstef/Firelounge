export default class User {

    /**
     * Creates a new User object.
     * @param uname: users username
     * @param projs: users current firelounge projects in an
     *               object of the form:
     *               {id: {name:"", path: "", features: ["", ...]}, ...,}
     * @param fb_projs: users current firebase projects in an
     *                  object of the form:
     *                  [{id:"", name:"", num:""}, ...,]
     * @param act_proj: current active project - will default to empty
     *                  string if no argument provided
     */
    constructor(uname, projs, fb_projs, act_proj="") {
        this._uname = uname;         // user name
        this._projs = projs;         // firelounge projects
        this._fb_projs = fb_projs;   // firebase projects

        // if active project empty, set to dummy object to avoid rendering errors
        (act_proj === "") ? this._act_proj = {id: "", name: "", path: "", features:[]} : this._act_proj = act_proj;
    }


    /************** PUBLIC METHODS **************/

    /* GETTER METHODS */

    /**
     * Returns users username.
     *
     * @return String
     */
    get uname() { return this._uname; }

    /**
     * Returns users projects.
     *
     * @return Object: {id: {name:String, path:String, features: [String, ...]}, ...}
     */
    get projs() { return this._projs; }

    /**
     * Returns users firebase projects
     *
     * @return Array: [{name:String, id:String, num:String}, ...]
     */
    get fb_projs() { return this._fb_projs; }

    /**
     * Returns current active project
     *
     * @returns Object: {id:String, name:String, path:String, features:[String, ...]}
     */
    get act_proj() {
        if (typeof this._act_proj === 'object') {
            return this._act_proj
        } else {
            let res = {};
            res.id = this._act_proj;
            res.name = this._projs[this._act_proj].name;
            res.path = this._projs[this._act_proj].path;
            res.features = this._projs[this._act_proj].features;
            res.db_all = this._projs[this._act_proj].database.all;
            res.db_active = this._projs[this._act_proj].database.active;
            return res;
        }
    }

    /**
     * Returns the array of firebase projects that have not been added
     * to firelounge.
     *
     * @returns Array: [{name:String, id: String, num: String}, ...]
     */
    get firebase_projs() {
        let projects = [];
        for (let p of this._fb_projs) {
            if (! this._projExists(p.id)) { projects.push(p) }
        }
        return projects;
    }

    /**
     * Returns an array of firebase projects that have been added to firelounge.
     *
     * @returns Array: [{id: String, name: String, path: String, features: [String]}
     */
    get firelounge_projs() {
        let projects = [];
        for (let p of this._fb_projs) {

            if (this._projExists(p.id)) {
                let res = {};
                let proj = this._projs[p.id];

                res.id = p.id;
                res.name = proj.name;
                res.path = proj.path;
                res.features = proj.features;
                res.db_all = proj.db_all
                res.db_active = proj.db_active

                projects.push(res)
            }

        }
        return projects;
    }


    /* SETTER METHODS */

    /**
     * Sets the users current active project.
     *
     * @param new_active: String representing the project ID
     */
    setActive(new_active) {
        if (this._projs[new_active] === undefined) {
            throw new Error(`A project with the id ${new_active} does not exist in firelounge`);
        }
        this._act_proj = new_active;
        this._writeUfile();
    }

    /**
     * Sets the active database for the current active project.
     *
     * @param new_active_db: the name given to the new db
     */
    setActiveDb(new_active_db) {
        if (this.projs[this._act_proj]['database']['all'][new_active_db] === undefined) {
            throw new Error(`A database with the name ${new_active_db} does not exist in this project's firelounge`);
        }
        this.projs[this._act_proj]['database']['active'] = new_active_db;
        this._writeUfile();
    }



    /* ADDITIONAL METHODS */

    /**
     * Adds a new project the firelounge. Throws an error if
     * the project already exists in firelounge
     *
     * @param new_proj: project to be added in an object of
     *                  the form:
     *                  {id: "", name: "", path: ""}
     *
     * @precond path property must contain a valid path to a directory
     *          with a firebase.json and .firebaserc file
     */
    addProj(new_proj) {

        const fs = window.require('fs');

        // validate input
        if ((new_proj.id === undefined)  || (new_proj.name === undefined) || (new_proj.path === undefined)) {
            throw new Error("Input for addProj must be of the form {id: \"\", name:\"\", path:\"\"}")
        }
        // check project does not already exist in firelounge
        else if (this._projsInclude(new_proj)) {
            throw new Error("This project already exists in firelounge");
        }

        // get features from firebase.json file
        let feats = ['hosting', 'database', 'functions']; // TODO - add reamaining features as they are supported
        let proj_features = [];
        let fbjson = fs.readFileSync(new_proj.path + "/firebase.json");
        fbjson = JSON.parse(fbjson);

        for (let f of feats) {
           if (fbjson.hasOwnProperty(f)) { proj_features.push(f) }
        }

        // add project to firelounge
        this._projs[new_proj.id] = {name: new_proj.name, path: new_proj.path, features: proj_features, database: {active: '', all:{} }};

        // update user file
        this._writeUfile();
    }

    /**
     * Removes a project from firelounge. Throws an error if
     * the project does not exist in firelounge.
     *
     * @param old_proj: String representing the project ID
     */
    removeProj(old_proj) {
        if ( this._projs[old_proj] === undefined ) {
            throw new Error(`A project with project id ${old_proj} does not exist in firelounge`);
        }

        delete this._projs[old_proj];
        this._writeUfile();
    }



    /*********** PRIVATE METHODS **************/

    /**
     * Checks if two objects of the form: {name: "", path: "", features: ["", ...]}
     * are of equal value.
     * @param a: first object to compare
     * @param b: second object to compare
     * @returns {boolean}: true if equal, false if not
     */
    static _projsEqual(a, b) {
        return ((a.name === b.name) && (a.path === b.path) && (a.features === b.features));
    }

    /**
     * Checks if this._projs contains the given object.
     * @param comp: the object to be search for of the form:
     *              {name:"", path:"", features: ["", ...]}
     * @returns {boolean}: true if found, false if not
     */
     _projsInclude(comp) {

         // make sure project id exists
         if (this._projs[comp.id] === undefined) {
             return false;
         }
         // if yes, check if objects are equal
         else {
             const projs = Object.this._projs.keys();
             for (let key of projs) {
                 if (User._projsEqual(comp, this._projs[key])) { return true }
             }
             return false;
         }
    }

    /**
     * Checks if the project with the given id exists in firelounge.
     * @param id: id of the project we are checking
     * @returns {boolean}: true if found, false if not
     */
    _projExists(id) {
         return this._projs.hasOwnProperty(id);
    }

    /**
     * Writes users active project and project information
     * to a json file.
     *
     * @postcond the previous user.json file will be overwritten
     */
    _writeUfile() {
        const fs = window.require('fs');

        let ufile = {};
        ufile.act_proj = this._act_proj;
        ufile.projs = this._projs;

        // TODO #25 - write user file to local Users folder
        fs.writeFileSync(`/Users/${this._uname}/${this._uname}.json`, JSON.stringify(ufile));
    }
}

/* Some simple test data */
/*
let projects = {123:{name:"proj1", path:"./Users/proj1", features:["H"]},
    456:{name:"new_proj", path:"/users/robertstefanyshin/", features:["H"]}};

let fb_projects = [{name: "proj1", id: "123", num: "1234"},
    {name: "test_proj", id: "321", num: "5678"},
    {name: "new_proj", id: "456", num: "23048"}];

let test_user = new User("Robert", projects, fb_projects);

console.log(test_user.act_proj);
 */
