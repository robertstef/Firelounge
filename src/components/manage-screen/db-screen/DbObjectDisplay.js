import React, {useState, useEffect} from 'react'
import ReactJson from 'react-json-view';


/*  
    Used to compare two different Json Objects 
    Returns the different keys between them
*/
function diff(obj1, obj2) {
    const result = {};
    if (Object.is(obj1, obj2)) {
        return undefined;
    }
    if (!obj2 || typeof obj2 !== 'object') {
        return obj2;
    }
    Object.keys(obj1 || {}).concat(Object.keys(obj2 || {})).forEach(key => {
        if(obj2[key] !== obj1[key] && !Object.is(obj1[key], obj2[key])) {
            result[key] = obj2[key];
        }
        if(typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
            const value = diff(obj1[key], obj2[key]);
            if (value !== undefined) {
                result[key] = value;
            }
        }
    });
    return result;
}


/* ***** INITIALIZE FIREBASE ADMIN APP WILL BE MOVED WHEN DYNAMIC DB SELECTION IS POSSIBLE ****** */

var admin = window.require("firebase-admin");

// Fetch the service account key JSON file contents
let serviceAccount = require('../../../Users/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();



export default function DbObjectDisplay() {
    const [objectSrc, setObjectSrc] = useState({})
    
    useEffect(() => {
        //handles display update of any changes made to database via firebase console or in app
        ref.on("value", (snapshot) => {
            setObjectSrc(snapshot.val())
        })
    }, [] );

    /* 
        When object is edited...
        Updates the reference in Firebase
    */
    const makeEdit = (result) => {
        /*
            create string to traverse json object and update in firebase
            namespace = array of keys to get to changed value
            name = key that was changed
            new_value = the new value lol 
        */
        let query_string = '';
        for(var i = 0; i < result.namespace.length; i++) {
            query_string += result.namespace[i]
            query_string += '/'
        }
        
        //traverse and update
        db.ref(query_string).update({
            [result.name] : result.new_value
        })

    }

    /* 
        When object is added...
        Updates the reference in Firebase with the new key and the string 'Null'
        Actual null entries arent allowed in firebase 
        Need to find a solution to adding nested components
    */
    const makeAdd = (result) => {
        /*
        Create string to traverse json object and update in firebase
        namespace = array of keys to get to added value
        name = parent key of item that is added
        new_value = new key being added
        */

        let query_string = '';
        for(var i = 0; i < result.namespace.length; i++) {
            query_string += result.namespace[i]
            query_string += '/'
        }

        query_string += result.name
        query_string += '/'

        //get difference between old and new objects -- seemed like bad practice to update entire object
        var keys = diff(result.new_value, result.existing_value)
        var newKey = Object.keys(keys)[0]

        //traverse and update
        db.ref(query_string).update({
            [newKey] : 'NULL'
        })


    }


    /* 
        When object is delete...
        Updates reference in firebase
        Concats a string to find element and removes it
    */
    const makeDelete = (result) => {
        /*
        Create string to traverse json object and update in firebase
        namespace = array of keys to get to deleted element
        name = key of item deleted
        new_value = should be undefined.
        */
        
        let query_string = '';
        for(var i = 0; i < result.namespace.length; i++) {
            query_string += result.namespace[i]
            query_string += '/'
        }
        
        //if deleting an item from the root
        if(query_string === '') {
            console.log('here')
            db.ref().child(result.name).remove();      
        } else {
            // traverse and delete child
            db.ref(query_string).child(result.name).remove();  
        }
        
    }




    var onEdit = true
    var onAdd = true
    var onDelete = true

    return(
        <div style={{height: '100%', width: '100%', overflow: 'auto', padding: '10px'}}>
            <ReactJson 
                name={false}
                src={objectSrc }
                collapsed={1}
                onEdit={   
                    onEdit
                        ? result => {
                                makeEdit(result)
                            }
                        : false
                    }
                onAdd={
                    onAdd
                        ? result => {
                                makeAdd(result)
                            }
                        : false
                }
                onDelete={
                    onDelete
                        ? result => {
                                makeDelete(result)
                            }
                        : false
                }
            />
        </div>
    )
}

