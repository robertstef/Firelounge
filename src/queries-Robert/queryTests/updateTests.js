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

const execUpdateTests = async () => {

    /**
     *  Tests are performed under the assumption that the database has the exact same data as the dummy data object
     * */
    // 1: Basic update query with a single WHERE using equals
    let query2 = 'update games/Scores set Jackson=1000, where Robert=15';
    let expected2 = {games : {
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
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result2 = await fbsql.executeQuery(query2, db, true);
    assert.deepStrictEqual(result2,expected2);

    // 2: Basic update query with single Where using greater than
    let query3= 'update games/Scores set Jackson=9999, where Robert>1000';
    let expected3 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 20},
                {Name: 'Ben', Number: 15},
            ],
            Events: ['cards', 'coding', 'skiing'],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                cards: { Ben: 3, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };

    let result3 = await fbsql.executeQuery(query3, db, true);
    assert.deepStrictEqual(result3,expected3);

    // 3: Updating a value in an array of Objects
    let query4= 'update games/Employees set Number=33, where Name=Robert';
    let expected4 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 33},
                {Name: 'Ben', Number: 15},
            ],
            Events: ['cards', 'coding', 'skiing'],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                cards: { Ben: 3, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result4 = await fbsql.executeQuery(query4, db, true);
    assert.deepStrictEqual(result4,expected4);

    // 4: Using a nested select statement as the SET field
    let query5 = 'update games/Employees set Number=(select Robert from games/Scores/coding), where Name=Ben';
    let expected5 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 33},
                {Name: 'Ben', Number: 1500},
            ],
            Events: ['cards', 'coding', 'skiing'],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                cards: { Ben: 3, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result5 = await fbsql.executeQuery(query5, db, true);
    assert.deepStrictEqual(result5, expected5);

    // 5: Case with multiple WHERES
    let query6 = 'update games/Scores set Ben=300, where Jackson=4 and Robert=3';
    let expected6 = {games : {
            Employees: [
                {Name: 'Jackson', Number: 15},
                {Name: 'Robert', Number: 33},
                {Name: 'Ben', Number: 1500},
            ],
            Events: ['cards', 'coding', 'skiing'],
            Players: ['Robert', 'Ben', 'Jackson'],
            Scores: {
                cards: { Ben: 300, Jackson: 4, Robert: 3 },
                coding: { Ben: 900, Jackson: 9999, Robert: 1500 },
                skiing: { Ben: 100, Jackson: 1000, Robert: 15 }
            },
            Winners: { cards: 'Jackson', coding: 'Robert', skiing: 'Ben' }
        }
    };
    let result6 = await fbsql.executeQuery(query6, db, true);
    assert.deepStrictEqual(result6, expected6);


    console.log("*****UPDATE TESTS COMPLETE*****")
};

execUpdateTests();
