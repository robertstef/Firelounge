const admin = require('firebase-admin');
const fbsql = require('../execQuery');

let serviceAccount =  "/Users/robertstefanyshin/FL_testdir/cmpt350-project/" +
    "cmpt350-project-ed891-firebase-adminsdk-q24yr-a278e93a9d.json";

let app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cmpt350-project-ed891.firebaseio.com"
});

let db = app.database();

let results = fbsql.executeQuery("select * from games", db, false);
console.log(results);
