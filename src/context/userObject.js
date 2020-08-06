
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
    constructor(uname, projs="", fb_projs="", act_proj="") {
        this._uname = uname;         // user name
        this._projs = projs;         // firelounge projects
        this._fb_projs = fb_projs;   // firebase projects
        this._act_proj = act_proj;   // active project

        //if there is an active project -- initialize firebase admin sdk 
        if (act_proj !== "" && typeof(projs[act_proj].admin) === 'string' && projs[act_proj].admin !== ""){
            let admin = window.require("firebase-admin");
            
            // Fetch the service account key JSON file contents
            let path = projs[act_proj].admin
            let serviceAccount = window.require(path);


            //if there is already an initialzed app, delete it and initialize the new admin sdk
            if( admin.apps !== undefined && admin.apps.length > 0 ) {
                admin.apps[0].delete()
            }

            // Initialize the app with a service account, granting admin privileges
            var app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });

            this.admin = app

            //init active database 
            //check if theres a database url in User file -- if not use project name
            if( this._hasActiveDb() ) {
                if (this._isDefaultDb) {
                    //no db url found... use default project name
                    let db = this.admin.database("https://" + this.admin.options_.credential.projectId + ".firebaseio.com");
                    this.db = db; 
                } else {
                    //database url exists
                    let db = this.admin.database("https://" + this.active_db_url + ".firebaseio.com");
                    this.db = db; 
                }
            }
        } 

        
        if(uname !== undefined && uname !== ''){
            this._writeUfile()
        }
        
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
        if (this._act_proj === '') {
            let res = {};
            res.id = '';
            res.name = '';
            res.path = '';
            res.features = '';
            res.admin = '';
            res.db_all = '';
            res.db_active = '';
            return res
        } else {
            let res = {};
            res.id = this._act_proj;
            res.name = this._projs[this._act_proj].name;
            res.path = this._projs[this._act_proj].path;
            res.features = this._projs[this._act_proj].features;
            res.admin = this._projs[this._act_proj].admin;
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
        if(this._fb_projs === undefined) {return undefined};
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
                res.admin = proj.admin
                res.db_all = proj.db_all
                res.db_active = proj.db_active

                projects.push(res)
            }

        }
        return projects;
    }

    /**
     * Returns the name of the projects active database
     *
     * @returns string: name
     */
    get active_db_name(){
        try {
            return this.projs[this.act_proj.id]['database']['active'];
        } catch (error){
            return ''
        }
    }
    /**
     * Returns the name of the projects active database url
     *
     * @returns string: url
     */
    get active_db_url(){
        try {
            return this.projs[this.act_proj.id]['database']['all'][this.active_db_name]['url'];
        } catch( error) {
            return ''
        }
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

        //update admin sdk with active proj -- where available
        if(this._act_proj !== "" && this.projs[new_active].admin !== undefined && this.projs[new_active].admin !== ""){
            let admin = window.require("firebase-admin");
            // Fetch the service account key JSON file contents
            let path = this.projs[new_active].admin
            let serviceAccount = window.require(path);
            
            //if there is already an initialzed app, delete it and initialize the new admin sdk
            if( admin.apps.length > 0 ) {
                admin.apps[0].delete()
            }

            var app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            this.admin = app
            this.setActiveDb(this.active_db_name)
        } else{
            this.admin = ''
        }

        this._writeUfile();
    }

    /**
     * Sets the active database for the current active project.
     *
     * @param new_active_db: the name given to the new db
     * @postcondition overwrites the Users file
     */
    setActiveDb(new_active_db) {
        if (!this._doesDbExist(new_active_db)) {
            throw new Error(`A database with the name ${new_active_db} does not exist in this project's firelounge`);
        }
        this.projs[this._act_proj]['database']['active'] = new_active_db;
        
        //check if theres a database url in User file -- if not use project name
        if (this.admin !== undefined && this.admin !== '') {
            if (this._isDefaultDb) {
                //no db url found... use default project name
                let db = this.admin.database("https://" + this.admin.options_.credential.projectId + ".firebaseio.com");
                this.db = db; 
            } else {
                //database url exists
                let db = this.admin.database("https://" + this.active_db_url + ".firebaseio.com");
                this.db = db; 
            }
        }

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
        this._projs[new_proj.id] = {name: new_proj.name, path: new_proj.path, features: proj_features, admin: '', database: {active: '', all:{} }};

        //set new project as active project
        this.setActive(new_proj.id)

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


     /**
     * Adds a new database to the Users current project 
     * 
     * @param dbObj: {
     *                 'path': the path the Admin SDK key
     *                 'dbName': the name given to the database,
     *                   'url': the url
     *              }
     * 
     * @returns none
     */

    addDb(newDb){
        var fs = window.require('fs');
        const {remote} = window.require('electron')
        const path = require('path');
        
        const userDir = remote.app.getPath('userData')
        let ufile_path = path.join(userDir, "Users/" + `${this._uname}` + ".json")
        var json = fs.readFileSync(ufile_path)
        json = JSON.parse(json)

        //TODO: check to see if the projects actually supports databases

        //if admin is undefined or admin doesnt match current projects 
        if(this.admin === '' || this.admin.options_.credential.projectId !== this.act_proj.id) {
            let admin = window.require("firebase-admin");
            // Fetch the service account key JSON file contents
            let serviceAccount = window.require(newDb.path);
            //if there is already an initialzed app, delete it and initialize the new admin sdk
            if( admin.apps.length > 0 ) {
                admin.apps[0].delete()
            }
            var app = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
            this.admin = app
        }

        //TODO: add check to see if db is already in there
        
        //add new db info in json object
        json['projs'][this.act_proj.id]['database']['active'] = newDb.dbName
        json['projs'][this.act_proj.id]['admin'] = newDb.path	
        json['projs'][this.act_proj.id]['database']['all'][newDb.dbName] = {'url': ""}
        if(newDb.url !== '') {
            json['projs'][this.act_proj.id]['database']['all'][newDb.dbName]['url'] = newDb.url
        }
        
        //set updated json object to the context
        this._projs[this.act_proj.id] = json['projs'][this.act_proj.id]
        this.setActiveDb(newDb.dbName)

        //write user file
        // fs.writeFileSync("./src/Users/" + `${this._uname}`+ ".json", JSON.stringify(json));
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
         else if (this._projs.length > 1 ) {
             const projs = Object.this._projs.keys();
             for (let key of projs) {
                 if (User._projsEqual(comp, this._projs[key])) { return true }
             }
         } 
         return false;
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
        const {remote} = window.require('electron')
        const path = require('path');

        
        
        let ufile = {};
        ufile.act_proj = this._act_proj;
        ufile.projs = this._projs;

        const userDir = remote.app.getPath('userData')
        let file_path = path.join(userDir, 'Users/' + `${this._uname}` + ".json")
        
        fs.writeFileSync(file_path, JSON.stringify(ufile));
    }


    /**
     * Checks if there is an active db for the current project
     * 
     *
     * @returns {boolean} true if there is an active db defined, false otherwise
     */
    _hasActiveDb(){
        if(this.projs[this.act_proj.id]['database']['active'] === '' || this.projs[this.act_proj.id]['database']['active'] === undefined ){
            return false;
        } else {
            return true;
        }
    }

    /**
     * Checks is the active db is the default database 
     * (ie is there a URL defined to access it)
     * 
     *
     * @returns {boolean} true the active db is the default, false otherwise
     */
    _isDefaultDb(){
        if(this.active_db_url === '' || this.active_db_url === undefined){
            return false;
        } else{
            return true;
        }
    }


    /**
     * Checks if there is a database with a provided id
     * @param dbName the name of the database you want to look up
     *
     * @returns {boolean} true if a db exists with that name, false otherwise
     */
    _doesDbExist(dbName){
        if (this.projs[this._act_proj]['database']['all'][dbName] === undefined) {
            return false
        }else {
            return true
        }
    }

}
