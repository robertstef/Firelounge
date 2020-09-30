const admin = require('firebase-admin');
const fbsql = require('../execQuery');
const assert = require('assert');

// Setup Database ref

const serviceAccount =  "/Users/jacksonschuler/testfireloungproj-91d8b-firebase-adminsdk-bb6rk-ce0b25a65e.json";

// const serviceAccount =  "/Users/robertstefanyshin/FL_testdir/testfireloungeproj/" +
//     "testfireloungproj-91d8b-firebase-adminsdk-bb6rk-49e89393ea.json";
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

    // 11. WHERE greater than or equal using numerical value
    result = await fbsql.executeQuery("select * from games/Scores where Ben >= 50", db, false);
    expected = {coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
        skiing: { Ben: 100, Jackson: 20, Robert: 15 }};
    assert.deepStrictEqual(result, expected);

    // 12. TODO - WHERE greater than or equal using string value (need to update dummy data)

    // 13. WHERE greater than with numerical value
    result = await fbsql.executeQuery("select * from games/Scores where Robert > 3", db, false);
    expected = {coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
        skiing: { Ben: 100, Jackson: 20, Robert: 15 }};
    assert.deepStrictEqual(result, expected);

    // 14. WHERE greater than no match
    result = await fbsql.executeQuery("select * from games/Scores where Robert > 1500", db, false);
    expected = {};
    assert.deepStrictEqual(result, expected);

    // 15. WHERE less than or equal
    result = await fbsql.executeQuery("select * from games/Scores where Robert <=15", db, false);
    expected = {cards: { Ben: 3, Jackson: 4, Robert: 3 },
        skiing: { Ben: 100, Jackson: 20, Robert: 15 }};
    assert.deepStrictEqual(result, expected);

    // 16. WHERE less than
    result = await fbsql.executeQuery("select * from games/Scores where Robert < 15", db, false);
    expected = {cards: { Ben: 3, Jackson: 4, Robert: 3 }}
    assert.deepStrictEqual(result, expected);


    // TESTING MULTIPLE WHERES
    result = await fbsql.executeQuery("select * from games/Scores where Robert=1500 and Jackson=1000", db, false);
    // Robert=1500 is true, Jackson=1000 is false, however since Robert=1500 is true, it will return the Object even though Jackson=1000 is false
    expected = {coding: { Ben: 900, Jackson: 1200, Robert: 1500 }}; //success
    assert.deepStrictEqual(result, expected);

    result = await fbsql.executeQuery("select * from games/Scores where Jackson=4 and Ben<0", db, false);
    expected = {}; // our expected result should be an empty object because no Object in scores exists where Jackson=4 and Ben<0
    assert.deepStrictEqual(result, expected);

    result = await fbsql.executeQuery("select * from games/Scores where Jackson=9000 and Ben=900", db, false);
    expected = {}; //same situation here, just made the first WHERE be the false condition and second WHERE being the true condition
    assert.deepStrictEqual(result, expected);

    console.log("*** SELECT TESTS PASSED ***")
}

execSelectTests(data);


