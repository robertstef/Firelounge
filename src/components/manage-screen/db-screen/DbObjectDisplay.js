import React, { Component} from 'react'
import ReactJson from 'react-json-view';

var admin = window.require("firebase-admin");

// Fetch the service account key JSON file contents
let serviceAccount = require('../../../cmpt350-project-ed891-firebase-adminsdk-q24yr-4a8416d60e.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref();
export default class DbObjectDisplay extends Component {
    state={
        src: {}
    }
    
    componentDidMount() {
        ref.on("value", (snapshot) => {
            this.setState({src: snapshot.val()})
        });
    };

    /* 
        When object is edited...
        Updates the display in Firelounge and updates the reference in Firebase
    */
    makeEdit(result){
        //update object display in firelounge
        this.setState({ src: result.updated_src })

        /*
            create string to traverse json object and update in firebase
            namespace = array of keys to get to changed value
            name = key that was changed
            new_value = the new value lol 
        */
        let query_string = '';
        for(var i = 0; i < result.namespace.length; i++) {
            console.log(result.namespace[i])
            query_string += result.namespace[i]
            query_string += '/'
        }
        
        //traverse and update
        db.ref(query_string).update({
            [result.name] : result.new_value
        })

    }


    render() {
        var onEdit = true
        var onAdd = true

        return(
            <div style={{height: '100%', width: '100%'}}>
                <ReactJson 
                    name={false}
                    src={this.state.src}
                    collapsed={1}
                    onEdit={   
                        onEdit
                            ? result => {
                                  this.makeEdit(result)
                              }
                            : false
                        }
                    onAdd={
                        onAdd
                            ? result => {
                                  console.log(result)
                                  this.setState({ src: result.updated_src })
                              }
                            : false
                    }
                />
            </div>
        )
    }
}