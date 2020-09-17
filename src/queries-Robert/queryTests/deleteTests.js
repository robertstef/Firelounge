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
            {Name: 'Ben', Number: 15},
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

    let query0 = 'delete from games/Events';
    let expected0 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 15},
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
    let result0 = await fbsql.executeQuery(query0, db, true);
    assert.deepStrictEqual(result0, expected0);

    let query1 = 'delete from games/Scores/cards';
    let expected1 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 15},
            ],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result1 = await fbsql.executeQuery(query1, db, true);
    assert.deepStrictEqual(result1, expected1);

    let query2 = 'delete from games/Scores where Ben=900,';
    let expected2 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 15},
            ],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result2 = await fbsql.executeQuery(query2, db, true);
    assert.deepStrictEqual(result2, expected2);

    let query3 = 'delete from games/Employees where Number=15';
    let expected3 = {games : {
            Employees: [
                {Name: 'Robert', Number: 20},
            ],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result3 = await fbsql.executeQuery(query3, db, true);
    assert.deepStrictEqual(result3, expected3);
    console.log(result3);

    console.log("*****DELETE TESTS COMPLETE*****")

};

execDeleteTests();
