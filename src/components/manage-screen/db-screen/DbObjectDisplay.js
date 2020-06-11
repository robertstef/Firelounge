import React, { Component } from 'react'
import ReactJson from 'react-json-view';
const fs = window.require('fs');
var admin = window.require("firebase-admin");

export default class DbObjectDisplay extends Component {
    state= {
        db : {}
    }

    componentDidMount() {
        //hardcoded for now
        let rawData =  fs.readFileSync('./src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4a8416d60e.json');
        let serviceAccount = JSON.parse(rawData)

        // Initialize the app with a service account, granting admin privileges
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
        });

        
        // As an admin, the app has access to read and write all data, regardless of Security Rules
        var db = admin.database();
        var ref = db.ref();
        ref.once("value", (snapshot) => {
            this.setState({db : snapshot.val()})
        });
    };


    render() {
        var onEdit = true
        var onAdd = true

        return(
            <div style={{height: '100%', width: '100%'}}>
                <ReactJson 
                    name={false}
                    src={this.state.db}
                    collapsed={1}
                    onEdit={   
                        onEdit
                            ? result => {
                                  console.log(result)
                                  this.setState({ src: result.updated_src })
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