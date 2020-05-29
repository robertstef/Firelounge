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
This is a sample endpoint - should return 'Hello World' as data
Console logs will appear in terminal of dev server
If using production version - use the log file created
*/
app.get("/test", (req, res) => {
    //define pathname to script
    const pathname = `/${path.join(__dirname, "/scripts/test.js")}`
    log.info(pathname)
    
    // create child process and call script
    const child_process = exec('node ' + pathname);

    // get stdout from child process
    child_process.stdout.on('data', (data) => {
        console.log(`stdout:\n ${data}`);
        log.info(data);
        res.status(200).send(data);
    });
    //get stderr from child process
    child_process.stderr.on('data', (data) => {
        console.error(`stderr:\n ${data}`);
        log.info(data);
        res.status(400).send(data)
    });
    //exit child process when finished
    child_process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        log.info(code);
    });	
});


app.listen(5000, () => log.info('App listening on port 5000'));
