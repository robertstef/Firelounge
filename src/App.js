const express = require('express')
const cors = require('cors')({ origin: true });
const path = require('path')
const bodyParser = require('body-parser')
const isDev = require("electron-is-dev");
const { exec } = require('child_process');

//setup logging info
const log = require('electron-log')
log.transports.file.level = 'info';
log.transports.file.file = 'electron-log.log';

//define express server
const app = express()
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



/*
This is a sample endpoint - should return cwd as data
Console logs will appear in terminal of dev server
If using production version - use the log file created
*/

const test_module = require('./scripts/test.js')
app.get("/test", (req, res) => {
    test_module.test_function().then((output) => {
        if( output.code === 0 ) {
            res.status(200).send(output.stdout);
        } else {
            res.status(400).send();
        }
    }) ;

});

/*
End point for user login 
currently forces a login no matter current status
on success returns status 200 and data username
*/
const login_module = require('./scripts/login.js')
app.get("/login", (req, res) => {
    login_module.login_function().then((output) => {
        if( output.code === 0 ) {
           	//parse username
           	let uname = output.stdout.split(" ");
        	uname = uname[uname.length - 1];
			uname = uname.split("@");
        	uname = uname[0];
        	uname = uname.slice(4);

            res.status(200).send(uname);
        } else {
            res.status(400).send(output.stderr);
        }
    }) ;
})


/*
Endpoint used to insert a project into the users .json file
Request Body formatted as such:     
var body = {
    'path' ='/Users/benbaker/Documents/opench-370-project-dev',
    'name' = undefined,
    'username' = 'testusername'}
Returns status 200 and project id on success - 400 on fail
*/
const insertProject_module = require('./scripts/insertProject.js')
app.post("/insertProject", (req, res) => {
    insertProject_module.insertProject_function(req.body).then((output) => {
        if( output === -1 ) {
            res.status(400).send('NOT CHILL');            
        } else {
            //success - send project id
            res.status(200).send(output);
        }
    })
});




app.listen(5000, () => log.info('App listening on port 5000'));



















