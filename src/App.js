const express = require('express')
const cors = require('cors')({ origin: true });
const path = require('path')
const bodyParser = require('body-parser')
const isDev = require("electron-is-dev");

const app = express()

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`));

app.get("/test", (req, res) => {
	res.status(200).send('test');
		return null;
	})


app.listen(5000, () => console.log('App listening on port 5000'));
