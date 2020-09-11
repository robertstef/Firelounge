const admin = require('firebase-admin');
const fbsql = require('../execQuery');
const assert = require('assert');

// Setup Database ref
const serviceAccount =  "/Users/jacksonschuler/testfireloungproj-91d8b-firebase-adminsdk-bb6rk-ce0b25a65e.json";

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfireloungproj-91d8b.firebaseio.com/"
});

const db = app.database();

// Dummy data loaded into database
const data = {
    Events: ['cards', 'coding', 'skiing'],
    Players: ['Robert', 'Ben', 'Jackson'],
    Scores: {
        cards: { Ben: 3, Jackson: 4, Robert: 3 },
        coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
        skiing: { Ben: 100, Jackson: 20, Robert: 15 }
    },
    Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
};

const execDeleteTests = async () => {

    // we can delete entire things from the db
    let query = 'delete from games/Events';
    let result = await fbsql.executeQuery(query, db, true);

    console.log(result);

    // let query = 'delete from games/Employees where num=13';
    // await fbsql.executeQuery(query, db, true);
};

execDeleteTests();
