import React, {useState, useEffect} from 'react'
import ReactJson from 'react-json-view';
import {UserState} from '../../../context/userContext'


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
            // console.log('No admin file found')
            return
        }
        
        //handles display update of any changes made to database via firebase console or in app
        ref.on("value", (snapshot) => {
            setDisplaySrc(snapshot.val())
        })   


    }, [user])
 

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
            db.ref().child(result.name).remove();      
        } else {
            // traverse and delete child
            db.ref(query_string).child(result.name).remove();  
        }
        
    }

    
    console.log(user.act_db_settings);
    
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
                                makeEdit(result)
                            }
                        : false
                    }
                onAdd={
                    user.act_db_settings.Add
                        ? result => {
                                makeAdd(result)
                            }
                        : false
                }
                onDelete={
                    user.act_db_settings.Delete
                        ? result => {
                                makeDelete(result)
                            }
                        : false
                }
            />
        </div>
    )
}

