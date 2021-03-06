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

    
/* 
    When object is edited...
    Updates the reference in Firebase
*/
const makeEdit = (db, result) => {
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
    if (query_string !== '') {
        db.ref(query_string).update({
            [result.name] : result.new_value
        })
    }
};

/* 
    When object is added...
    Updates the reference in Firebase with the new key and the string 'Null'
    Actual null entries arent allowed in firebase 
    Need to find a solution to adding nested components
*/
const makeAdd = (db, result) => {
    /*
    Create string to traverse json object and update in firebase
    namespace = array of keys to get to added value
    name = parent key of item that is added
    new_value = new key being added
    */

   let query_string = '';

   //handles case when addition is first in the database
    if(Object.keys(result.existing_src).length === 0 && typeof(result.existing_src) === 'object' ) {
        console.log('equals null')
        query_string += '/'
    } else {
        for(var i = 0; i < result.namespace.length; i++) {
            query_string += result.namespace[i]
            query_string += '/'
        }
        query_string += result.name
        query_string += '/'
    }

    //get difference between old and new objects -- seemed like bad practice to update entire object
    var keys = diff(result.new_value, result.existing_value)
    var newKey = Object.keys(keys)[0]

    console.log(query_string)
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
const makeDelete = (db, result) => {
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



export {makeEdit, makeAdd, makeDelete};