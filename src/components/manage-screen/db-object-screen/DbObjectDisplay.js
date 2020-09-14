import React, {useState, useEffect} from 'react'
import ReactJson from 'react-json-view';
import {UserState} from '../../../context/userContext'
import {makeEdit, makeDelete, makeAdd} from './DbOperations'


/* ***** INITIALIZE FIREBASE ADMIN APP WILL BE MOVED WHEN DYNAMIC DB SELECTION IS POSSIBLE ****** */

var admin = window.require("firebase-admin");

// Fetch the service account key JSON file contents
let serviceAccount = require('../../../cmpt350-project-ed891-firebase-adminsdk-q24yr-26a62e5c53.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();
export default function DbObjectDisplay() {
    const {user} = UserState();
    const [displaySrc, setDisplaySrc] = useState({})    


    //update the context database reference
    //catch error where there is no database defined.  
    try {
        var db = user.db_obj
        var ref = db.ref();
    }catch(error) {
        // console.log(error)
    }
    
    useEffect(() => {
        if(user.admin_obj === '' || user.db_obj === undefined ){
            return
        }
        
        //handles display update of any changes made to database via firebase console or in app
        ref.on("value", (snapshot) => {
            if(snapshot.val() !== null) {
                setDisplaySrc(snapshot.val())
            }
        })   


    }, [user.act_db_name, ref, user.admin_obj, user.db_obj])

    return(
        <div style={{height: '100%', width: '100%', padding: '10px'}}>
            <ReactJson 
                name={false}
                src={displaySrc}
                collapsed={user.act_db_settings.Collapsed !== undefined ? user.act_db_settings.Collapsed : true }
                enableClipboard= {user.act_db_settings.Clipboard !== undefined ? user.act_db_settings.Clipboard : true }
                sortKeys = {user.act_db_settings.SortKeys !== undefined ? user.act_db_settings.SortKeys : false }
                displayDataTypes = {user.act_db_settings.DisplayDataType !== undefined ? user.act_db_settings.DisplayDataType : false }
                displayObjectSize =  {user.act_db_settings.DisplayObjectSize !== undefined ? user.act_db_settings.DisplayObjectSize : false }
                onEdit={   
                    user.act_db_settings.Edit
                        ? result => {
                                makeEdit(db, result)
                            }
                        : false
                    }
                onAdd={
                    user.act_db_settings.Add
                        ? result => {
                                makeAdd(db, result)
                            }
                        : false
                }
                onDelete={
                    user.act_db_settings.Delete
                        ? result => {
                                makeDelete(db, result)
                            }
                        : false
                }
            />
        </div>
    )
}

