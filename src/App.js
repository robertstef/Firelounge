const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const isDev = require("electron-is-dev");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`));

app.get('/test', (request, response) => {
	response.send('Welcome to Firelounge')
});

app.listen(5000, () => console.log('App listening on port 5000'));
