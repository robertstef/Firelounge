const express = require('express')
const cors = require('cors')({ origin: true });
const path = require('path')
const bodyParser = require('body-parser')
const isDev = require("electron-is-dev");
const { spawn } = require('child_process');

const app = express()

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.get("/test", (req, res) => {
	    const test_spawn = spawn("pwd");

        test_spawn.stdout.on('data', (data) => {
            console.log(`stdout:\n ${data}`);
            res.status(200).send(data);
        });

        test_spawn.stderr.on('data', (data) => {
            console.error(`stderr:\n ${data}`);
        });

        test_spawn.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });	

		return null;
	})


app.listen(5000, () => console.log('App listening on port 5000'));
