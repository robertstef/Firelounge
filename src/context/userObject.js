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

        //attempt to init App with Firebase Admin
        this._initializeApp();

        //attempt to create Database ref with Firebase Admin	
        this._initializeDb();

        // if not logged in -- dont write blank userfile
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
            return res
        } else {
            let res = {};
            res.id = this._act_proj;
            res.name = this._projs[this._act_proj].name;
            res.path = this._projs[this._act_proj].path;
            res.features = this._projs[this._act_proj].features;
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
    get act_db_name(){
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
    get act_db_url(){
        try {
            return this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['url'];
        } catch( error) {
            return ''
        }
    }

    get app_admin() { return this.admin; }

    /**
     * Returns the name of the projects active database settings 
     *
     * @returns object: settings object
     */
    get act_db_settings(){
        try {
            return this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['settings'];
        } catch( error) {
            return undefined
        }
    }
    
    /**
     * Returns array of all databases objects defined for the active project
     *
     * @returns array : 
     */
    get act_proj_db_list(){
        try {
            return this.projs[this.act_proj.id]['database']['all'];
        } catch( error) {
            return {}
        }
    }

    /**
     * Returns string absolute path to the admin key file
     *
     * @returns string: absolute file path
     */
    get act_proj_admin_path(){
        try {
            return this.projs[this.act_proj.id]['admin'];
        } catch( error) {
            return undefined
        }
    }

    /**
     * Returns array of queries saved for the active project
     *
     * @returns array : 
     */
    get act_db_queries() {
        try {
            return this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['queries'];
        } catch (error) {
            return undefined
        }
    }

    /**
     * Return the database object.
     *
     * @returns {undefined}
     */
    get db_object() {
        try {
            return this.db_obj;
        } catch (err) {
            return undefined;
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

        this._initializeApp();

        this.setActiveDb(this.act_db_name)

        this._writeUfile();
    }

    /**
     * Sets the active database for the current active project.
     *
     * @param new_active_db: the name given to the new db
     * @postcondition overwrites the Users file
     */
    setActiveDb(new_active_db) {
        
        //check if there are any dbs defined or if there is not admin defined
        if(Object.keys(this.act_proj_db_list).length === 0 || this.act_proj_admin_path === '') {
            this.db_obj = '';
            return;
        }
        //confire that new_active actually exists
        if (!this._doesDbExist(new_active_db)) {
            throw new Error(`A database with the name ${new_active_db} does not exist in this project's firelounge`);
        }
        //set new db to active
        this.projs[this.act_proj.id]['database']['active'] = new_active_db;
        
        this._initializeDb();
        this._writeUfile();
    }


    /**
     * Saves the database settings as defined in the settings modal 
     *
     * @param settingsObejct: object of settings to be save for the databse
     * @postcondition overwrites the Users file -- the previous settings for the database are lost
     */
    saveDbSettings(settingsObject) {
        if (!this._hasActiveDb()) {
            throw new Error(`This project does not have an active database`);
        }

        this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['settings'] = settingsObject

        this._writeUfile();
    }

    /**
     * Saves a database queries  
     *
     * @param query: key value pair, key: name of query, value: string query
     * @postcondition pushes a query onto the act db list of queries
     */
    saveDbQuery(query) {
        if (!this._hasActiveDb()) {
            throw new Error(`This project does not have an active database`);
        }

        if (this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['queries'] === undefined){
            this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['queries'] = {};
        }

        this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['queries'][query.name] = query.queryString

        this._writeUfile();
    }

    /**
     * Deletes a database queries  
     *
     * @param queryName: string which is the name of the query and the key in the user file
     * @postcondition removes the query key-value pair from the user file
     */
    deleteDbQuery(queryName) {
        if (!this._hasActiveDb()) {
            throw new Error(`This project does not have an active database`);
        }

        try {
            delete this.projs[this.act_proj.id]['database']['all'][this.act_db_name]['queries'][queryName]
        } catch (error) {
            console.log(error)
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

        if (newDb.path === '' && ( this.act_proj_admin_path === undefined || this.act_proj_admin_path === '') ){
            throw new Error(`No Admin Key defined for this project`);
        }

        //if admin is undefined or admin doesnt match current projects 
        if(this.admin_obj === undefined || this.admin_obj === ''  || this.admin_obj.options_.credential.projectId !== this.act_proj.id ) {
            this._initializeApp();
        }
        
        //set new db as active
        this.projs[this.act_proj.id]['database']['active'] = newDb.dbName

        if( newDb.path !== '' ) {
            this.projs[this.act_proj.id]['admin'] = newDb.path    
        }
        this.projs[this.act_proj.id]['database']['all'][newDb.dbName] = {'url': "", 'settings': {Add: false, Edit: true, Delete: false, Collapsed: true, DisplayObjectSize: false, SortKeys: false, DisplayDataType: false, Clipboard: true}, "queries":{}}  

        if(newDb.url !== '') {
            this.projs[this.act_proj.id]['database']['all'][newDb.dbName]['url'] = newDb.url
        }

        this.setActiveDb(newDb.dbName)

        //write user file
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
        
        if( this.projs[this.act_proj.id]['database'] === undefined || this.projs[this.act_proj.id]['database']['active'] === '' || this.projs[this.act_proj.id]['database']['active'] === undefined ){
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


    /**
     * Initializes App with Firebase Admin module
     * 
     * @postcondition Sets this.admin_obj to the Firebase Admin object
     */
    _initializeApp(){
           //if there is an active project -- initialize firebase admin sdk 
           if (this.act_proj !== "" &&  this.act_proj_admin_path !== undefined && this.act_proj_admin_path !== "") {
            let admin = window.require("firebase-admin");

            // Fetch the service account key JSON file contents
            let path = this.act_proj_admin_path;
            let serviceAccount = window.require(path);

            //if there is already an initialzed app, delete it and initialize the new admin sdk
            if( admin.apps !== undefined && admin.apps.length > 0 ) {
                admin.apps[0].delete()
            }

            // Initialize the app with a service account, granting admin privileges
            this.admin_obj = admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        } else {
            this.admin_obj = '';
        }
    }

    /**
     * Initializes Database reference with firebase admin module
     * 
     * @postcondition Sets this.db_obj to the Firebase Admin database object
     */
    _initializeDb() {
        //init active database 
        //check if theres a database url in User file -- if not use project name
        if( this._act_proj !== "" && this.admin_obj !== undefined && this._hasActiveDb() ) {
            if (this._isDefaultDb) {
                //no db url found... use default project name
                this.db_obj = this.admin_obj.database("https://" + this.admin_obj.options_.credential.projectId + ".firebaseio.com");
            } else {
                //database url exists
                this.db_obj = this.admin_obj.database("https://" + this.active_db_url + ".firebaseio.com"); 
            }
        } 

    }
}
