const admin = require('firebase-admin');
const fbsql = require('../execQuery');
const assert = require('assert');

// Setup Database ref
// const serviceAccount =  "/Users/jacksonschuler/bensnewproject-firebase-adminsdk-vosix-e116f49375.json";

const serviceAccount = "/Users/jacksonschuler/testfireloungproj-91d8b-firebase-adminsdk-bb6rk-ce0b25a65e.json";

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // databaseURL: "https://bensnewproject.firebaseio.com/"
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

const execUpdateTests = async () => {
    /**
     *  Tests are performed under the assumption that the database has the exact same data as the dummy data object
     * */

    let query;
    let expected;
    let result;
    // //
    // // 1: Basic update query with a single WHERE using equals
    // query = 'update games/Scores set Jackson=1000, where Robert=15';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Jackson', Number: 15},
    //             {Name: 'Robert', Number: 20},
    //             {Name: 'Ben', Number: 19},
    //         ],
    //         Events: ['cards', 'coding', 'skiing'],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             cards: { Ben: 3, Jackson: 4, Robert: 3 },
    //             coding: { Ben: 900, Jackson: 1200, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result, expected);
    //
    // // 2: Basic update query with single Where using greater than
    // query= 'update games/Scores set Jackson=9999, where Robert>1000';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Jackson', Number: 15},
    //             {Name: 'Robert', Number: 20},
    //             {Name: 'Ben', Number: 19},
    //         ],
    //         Events: ['cards', 'coding', 'skiing'],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             cards: { Ben: 3, Jackson: 4, Robert: 3 },
    //             coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    //
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result,expected);
    //
    // // 3: Updating a value in an array of Objects
    // query= 'update games/Employees set Number=33, where Name=Robert';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Jackson', Number: 15},
    //             {Name: 'Robert', Number: 33},
    //             {Name: 'Ben', Number: 19},
    //         ],
    //         Events: ['cards', 'coding', 'skiing'],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             cards: { Ben: 3, Jackson: 4, Robert: 3 },
    //             coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result,expected);
    //
    // // 4: Using a nested select statement as the SET field
    // query = 'update games/Employees set Number=(select Robert from games/Scores/coding), where Name=Ben';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Jackson', Number: 15},
    //             {Name: 'Robert', Number: 33},
    //             {Name: 'Ben', Number: 1500},
    //         ],
    //         Events: ['cards', 'coding', 'skiing'],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             cards: { Ben: 3, Jackson: 4, Robert: 3 },
    //             coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result, expected);
    //
    // // 5: Case with multiple WHERES
    // query = 'update games/Scores set Ben=300, where Jackson=4 and Robert=3';
    // expected = {games : {
    //         Employees: [
    //             {Name: 'Jackson', Number: 15},
    //             {Name: 'Robert', Number: 33},
    //             {Name: 'Ben', Number: 1500},
    //         ],
    //         Events: ['cards', 'coding', 'skiing'],
    //         Players: ['Robert', 'Ben', 'Jackson'],
    //         Scores: {
    //             cards: { Ben: 300, Jackson: 4, Robert: 3 },
    //             coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
    //             skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
    //         },
    //         Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
    //     }
    // };
    // result = await fbsql.executeQuery(query, db, true);
    // assert.deepStrictEqual(result, expected);



    // Update tests for commitResults = false

    query = 'update games/Scores set Jackson=909, where Ben=300';
    result = await fbsql.executeQuery(query, db, false);
    expected ={
            Scores: {
                cards: { Ben: 300, Jackson: 909, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
    };
    assert.deepStrictEqual(result, expected);

    query = 'update games/Employees set Number=666, where Name=Jackson';
    result = await fbsql.executeQuery(query, db, false);
    expected = {
        Employees: [
            {Name: 'Jackson', Number: 666},
            {Name: 'Robert', Number: 33},
            {Name: 'Ben', Number: 1500},
        ]};
    assert.deepStrictEqual(result, expected);

    query ='update games/Employees set Number=(select Jackson from games/Scores/coding), where Name=Robert';
    expected = {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 9999},
                {Name: 'Ben', Number: 1500},
            ],
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);

    query = 'update games/Scores set Ben=6666, where Robert=3';
    expected = {
            Scores: {
                cards: { Ben: 6666, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
    };
    result = await fbsql.executeQuery(query, db, false);
    assert.deepStrictEqual(result, expected);

    console.log("*****UPDATE TESTS COMPLETE*****")
};

execUpdateTests();
