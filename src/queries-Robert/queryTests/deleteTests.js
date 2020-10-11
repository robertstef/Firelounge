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
const data = {games : {
        Employees: [
            {Name: 'Jackson', Number: 15},
            {Name: 'Robert', Number: 20},
            {Name: 'Ben', Number: 19},
        ],
        Events: ['cards', 'coding', 'skiing'],
        Players: ['Robert', 'Ben', 'Jackson'],
        Scores: {
            cards: { Ben: 3, Jackson: 4, Robert: 3 },
            coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
            skiing: { Ben: 100, Jackson: 20, Robert: 15 }
        },
        Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    }
};


const execDeleteTests = async () => {

    /**
     *  Tests are performed under the assumption that the database has the exact same data as the dummy data object
     * */

    let query;
    let result;
    let expected;

    // BASIC DELETION
    query = 'delete from games/Events';
    expected = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 19},
            ],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                cards: { Ben: 3, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    //BASIC DELETION WITHIN A FURTHER NESTED SECTION
    query = 'delete from games/Scores/cards';
    expected = {games : {
            Scores: {
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
        }
    };
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    // DELETION WITH MULTIPLE WHERES
    query = 'delete from games/Scores where Ben>800 and Robert>20';
    expected = {
            Scores: {
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
    };
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    // TESTING DELETION WITHIN AN ARRAY OF OBJECTS
    query = 'delete from games/Employees where Number=19';
    expected = {
        Employees: [
            {Name: 'Jackson', Number: 15},
            {Name: 'Robert', Number: 20},
        ],
    };
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);


    // TESTING WHEN COMMITRESULTS=FALSE
    query = 'delete from games/Players';
    expected = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
            ],
            Scores: {
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);

    // TESTING FOR NEITHER OF THE WHERES ARE SATISFIED
    query = 'delete from games/Scores where Ben<90 and Robert=0';
    expected = {
        Scores: {
            skiing: { Ben: 100, Jackson: 20, Robert: 15 }
        },
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);

    // TESTING DELETION FOR MULTIPLE WHERES
    query = 'delete from games/Scores where Ben>90 and Robert>10';
    expected = {
        Scores: {
        },
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);

    console.log("*****DELETE TESTS COMPLETE*****")

};

execDeleteTests();
