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

    let query;
    let result;
    let expected;

    query = 'delete from games/Events';
    expected = {games : {
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
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    query = 'delete from games/Scores/cards';
    expected = {games : {
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
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    query = 'delete from games/Scores where Ben=900,';
    expected = {games : {
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
    result = await fbsql.executeQuery(query, db, true);
    assert.deepStrictEqual(result, expected);

    // query = 'delete from games/Employees where Number=15';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Robert', Number: 20},
    //         ],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 20, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result, expected);


    // // TESTING WHEN COMMITRESULTS=FALSE
    //
    query = 'delete from games/Players';
    expected = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 15},
            ],
            Scores: {
                coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 20, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);




    console.log("*****DELETE TESTS COMPLETE*****")

};

execDeleteTests();
