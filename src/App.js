const express = require('express')
const cors = require('cors')({ origin: true });
const path = require('path')
const bodyParser = require('body-parser')
const isDev = require("electron-is-dev");
const { exec } = require('child_process');


//setup logging information
const log = require('electron-log')
log.transports.file.level = 'info';
log.transports.file.file = 'electron-log.log';
log.info('log message');

const app = express()

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get("/test", (req, res) => {
	    const test_spawn = exec("node ./src/scripts/test.js");

        test_spawn.stdout.on('data', (data) => {
            console.log(`stdout:\n ${data}`);
            log.info(data);
            res.status(200).send(data);
        });

        test_spawn.stderr.on('data', (data) => {
            console.error(`stderr:\n ${data}`);
            log.info(data);
        });

        test_spawn.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            log.info(code);
        });	

		return null;
	})


app.listen(5000, () => log.info('App listening on port 5000'));
