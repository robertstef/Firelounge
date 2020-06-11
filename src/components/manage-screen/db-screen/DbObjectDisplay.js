import React, { Component, useEffect, useState } from 'react'
import ReactJson from 'react-json-view';
const {remote} = window.require('electron')


const fs = window.require('fs');
var admin = window.require("firebase-admin");

export default function DbObjectDisplay() {
    const [db, setDb] = useState({})

    useEffect(()=> {

        // Fetch the service account key JSON file contents
        let rawdata = fs.readFileSync('./src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4a8416d60e.json');
        let serviceAccount = JSON.parse(rawdata);

        // Initialize the app with a service account, granting admin privileges
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
        });


        // As an admin, the app has access to read and write all data, regardless of Security Rules
        var db = admin.database();
        var ref = db.ref();
        ref.once("value", (snapshot) => {
            setDb(snapshot.val())
        });
    }, [admin] )

    var onEdit = true
    var onAdd = true

    return(
        <div style={{height: '100%', width: '100%'}}>
            <ReactJson 
                name={false}
                src={db}
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