const admin = require('firebase-admin');
const fbsql = require('../execQuery');
const assert = require('assert');

// Setup Database ref

const serviceAccount =  "/Users/robertstefanyshin/FL_testdir/testfireloungeproj/" +
    "testfireloungproj-91d8b-firebase-adminsdk-bb6rk-49e89393ea.json";
/*
const serviceAccount = "/Users/robertstefanyshin/FL_testdir/cmpt350-project/" +
    "cmpt350-project-ed891-firebase-adminsdk-q24yr-a278e93a9d.json"
 */

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testfireloungproj-91d8b.firebaseio.com/"
    //databaseURL: "https://cmpt350-project-ed891.firebaseio.com/"
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
}


/*********** SELECT TESTS ************/

const execSelectTests = async (data) => {
    let result;
    let expected;

    /*
    // 1. Retrieve whole database
    result = await fbsql.executeQuery("select * from games", db, false)
    expected = data;
    assert.deepStrictEqual(result, expected);

    // 2. Retrieve nested data
    result = await fbsql.executeQuery("select Players from games", db, false)
    expected = {Players: ['Robert', 'Ben', 'Jackson']};
    assert.deepStrictEqual(result, expected);


    // 3. Retrieve double nested data
    result = await fbsql.executeQuery("select cards from games/Scores", db, false);
    expected = {cards: { Ben: 3, Jackson: 4, Robert: 3 }};
    assert.deepStrictEqual(result, expected);

    // 4. Retrieve multiple fields
    result = await fbsql.executeQuery("select cards, coding from games/Scores", db, false);
    expected = {cards: { Ben: 3, Jackson: 4, Robert: 3 },
        coding: { Ben: 900, Jackson: 1200, Robert: 1500 }};
    assert.deepStrictEqual(result, expected);

    // 5. Retrieve multiple fields from triple nested data
    result = await fbsql.executeQuery("select Ben, Robert from games/Scores/coding", db, false);
    expected = {Ben: 900, Robert: 1500}
    assert.deepStrictEqual(result, expected);

    // 6. Error case - data does not exist
    try {
       await fbsql.executeQuery("select Cookie from games/Scores/coding", db, false);
    } catch (err) {
        let errmsg = "getSelectedFieldsFromResults(): the field Cookie was not found" +
            " in the database";
        assert.equal(errmsg, err.message);
    }
     */

    // 7. SELECT with basic WHERE statement
    result = await fbsql.executeQuery("select * from games/Scores where Robert = 15", db, false);
    expected = {skiing: {Ben: 100, Jackson: 20, Robert: 15 }};
    assert.deepStrictEqual(result, expected);

    // 8. SELECT when WHERE key does not exist
    result = await fbsql.executeQuery("select * from games where Robert = 15", db, false);
    expected = {};
    assert.deepStrictEqual(result, expected);

    // 9. WHERE not equals
    result = await fbsql.executeQuery("select * from games/Scores where Robert != 15", db, false);
    expected = {cards: { Ben: 3, Jackson: 4, Robert: 3 },
        coding: { Ben: 900, Jackson: 1200, Robert: 1500 }};
    assert.deepStrictEqual(result, expected);

    // 10. WHERE not equals - key not found
    result = await fbsql.executeQuery("select * from games where Players != \"Robert\"", db, false);
    expected = {};
    assert.deepStrictEqual(result, expected);

    
    console.log("*** SELECT TESTS PASSED ***")
}

execSelectTests(data);


