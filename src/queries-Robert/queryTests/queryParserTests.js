const qp = require('../parser/queryParser');
const assert = require('assert');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

/* Tests for formatAndCleanQuery() */
describe( 'formatAndCleanQuery', () => {
    it('Remove double slash comment', () => {
        let result = qp.formatAndCleanQuery('select * from games //this is a comment');
        assert.equal(result, 'select * from games');
    });

    it('Remove double dash', () => {
        let result = qp.formatAndCleanQuery('select from -- games');
        assert.equal(result, 'select from');
    });

    it('Remove carriage return character', () => {
        let result = qp.formatAndCleanQuery("select *\r from games")
        assert.equal(result, 'select * from games');
    });

    it('Remove carriage return followed by newline character', () => {
        let result = qp.formatAndCleanQuery('select * from \r\n games')
        assert.equal(result, 'select * from games');
    });

    it('Remove leading and trailing whitespace', () => {
        let result = qp.formatAndCleanQuery('     select * from games  ');
        assert.equal(result, 'select * from games');
    })

    it('Remove wrapping parenthesis', () => {
        let result = qp.formatAndCleanQuery('(select * from games)');
        assert.equal(result, 'select * from games');
    })

    it('Query with carriage return, whitespace, and comments', () => {
        let result = qp.formatAndCleanQuery('   \rselect * \r from games // add comment');
        assert.equal(result, 'select * from games');
    })

    it('Query with carriage return, newline, whitespace, and comments', () => {
        let result = qp.formatAndCleanQuery('  select * \r\n from \r\n games \r\n -- new comment');
        assert.equal(result, 'select * from games');
    })

    it('Empty string', () => {
        let result = qp.formatAndCleanQuery("");
        assert.equal(result, "");
    })
})


/* Tests for determineStatementType */
describe("determineStatementType", () => {
   it("select statement", () => {
       let result = qp.determineStatementType("select * from games");
       assert.equal(result, 'select');
   });

   it("update statement", () => {
       let result = qp.determineStatementType("UPDATE games SET player = John");
       assert.equal(result, 'update');
   });

   it("insert statement", () => {
       let result = qp.determineStatementType("insert into games values a b c");
       assert.equal(result, "insert");
   });

   it("delete statement", () => {
       let result = qp.determineStatementType("DELETE FROM games WHERE a < b");
       assert.equal(result, "delete");
   });

   it("invalid statement - incorrect keyword", () => {
       let result = qp.determineStatementType("REMOVE this from games");
       assert.equal(result, "invalid");
   });

   it("invalid statement - empty string", () => {
       let result = qp.determineStatementType("");
       assert.equal(result, "invalid");
   })
})


/* Tests for getCollection */
describe("getCollection - select statement", () => {
    it("select statement - non-nested collection", () => {
        let result = qp.getCollection("select * from games", "select");
        assert.equal(result, "games");
    });

    it("select statement - nested collection with slashes", () => {
        let result = qp.getCollection("select * from games/this/object", "select");
        assert.equal(result, "games/this/object");
    });

    it("select statement - nested collection with dot notation", () => {
        let result = qp.getCollection("select * from games.this.object", "select");
        assert.equal(result, "games/this/object");
    });

    it("select statement - nested collection with leading and trailing slashes", () => {
        let result = qp.getCollection("select * from /games/this/object/", "select");
        assert.equal(result, "games/this/object");
    });

    it("select statement - nested select statements", () => {
        let result = qp.getCollection("select * from (select this from /games/delta) object",
            "select");
        assert.equal(result, "object");
    });

    it("select statement - multiple nested select statements", () => {
        let result = qp.getCollection("select * from (select * from (select * from this)" +
            "that) other", "select");
        assert.equal(result, "other");
    });

    it("select statement - no collection given with whitespace", () => {
        let query = "select * from ";
        assert.throws(() => qp.getCollection(query, "select"),
            Error,
            "getCollection(): could not determine collection, missing from statement");
    });

    it("select statement - no collection given with no whitespace", () => {
        let query = "select * from";
        assert.throws(() => qp.getCollection(query, "select"),
            Error,
            "getCollection(): could not determine collection, missing from statement");
    });

});

/* Tests for getCollection update statements*/
describe("getCollection - update statement", () => {
    it("update statement - non-nested collection", () => {
        let result = qp.getCollection("update employees;", "update");
        assert.equal(result, "employees");
    });
    it("update statement  - nested collection with slashes", () => {
        let result = qp.getCollection("update employees/sections/id;", "update");
        assert.equal(result, "employees/sections/id");
    });
    it("update statement - non-nested collection with set and where clause", () => {
        let result = qp.getCollection("update games set playerName=Jack where playerName=Jackson;", "update");
        assert.equal(result, "games");
    });
    it("update statement - nested collection with slashes and set and where clause", () => {
        let result = qp.getCollection("update games/this/object set playerName=Jack where playerName=Jackson;", "update");
        assert.equal(result, "games/this/object");
    });
    it("update statement - no collection given without whitespace nor set and where clause", () => {
        let query = "update;";
        assert.throws(() => qp.getCollection(query, "update"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });
    it("update statement - no collection given with whitespace nor set and where clause", () => {
        let query = "update ;";
        assert.throws(() => qp.getCollection(query, "update"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });

    it("update statement - no collection given without whitespace and set and where clause", () => {
        let query = "update set playerName=Jack where playerName=Jackson;";
        assert.throws(() => qp.getCollection(query, "update"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });
    it("update statement - no collection given with whitespace and set and where clause", () => {
        let query = "update  set playerName=Jack where playerName=Jackson;";
        assert.throws(() => qp.getCollection(query, "update"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });
});

/* Tests for getCollection INSERT statement */
describe("getCollection - INSERT statement", () => {
    it("basic statement", () => {
        let result = qp.getCollection("insert into games/collection values (a, b, c)", 'insert');
        assert.equal(result, "games/collection");
    });

    it("statement with dot notation", () => {
        let result = qp.getCollection("insert into games.collection values (a, b, c)", 'insert');
        assert.equal(result, "games/collection");
    });

    it("statement without INTO keyword", () => {
        let query = "insert games/collection values (a, b)";
        assert.throws(() => qp.getCollection(query, 'insert'), Error,
            "getCollection(): INSERT invalid, missing INTO keyword. INSERT must be of" +
            " the form: INSERT INTO collection (key1, key2, ...) VALUES (value1, value2)");
    });

    it("statement with too few terms", () => {
        let query = 'insert games/collection';
        assert.throws(() => qp.getCollection(query, 'insert'), Error,
            "getCollection(): could not determine collection, missing from statement");
    });
});


/* Tests for getSets used in Update statements */
describe("getSets - Update statements", () => {
    it("getSets - basic example with single change", () => {
        let result = qp.getSets('update users set height=99, where age<16');
        assert.deepStrictEqual(result, { height: 99});
    });

    it("getSets - basic example with multiple changes", () => {
        let result = qp.getSets('update users set height=10, name=timmy where age<5');
        assert.deepStrictEqual(result, { height: 10, name: "timmy" });
    });

    it("getSets - basic example with nested change", () => {
        let result = qp.getSets('update users set name/height=10, where age<5');
        assert.deepStrictEqual(result, { 'name/height': 10});
    });

    it("getSets - basic example no set", () => {
        let result = qp.getSets('update players where score<20');
        assert.equal(result, null)
    });

    it("getSets - basic example with empty set", () => {
        let result = qp.getSets('update players set where score<20');
        assert.deepStrictEqual(result, {})
    });
});

/* Tests for getCollection delete statement*/
describe("getCollection - delete statement", () => {
   it("delete statement - non-nested collection", () => {
       let result = qp.getCollection("delete from games;", "delete");
       assert.equal(result, "games");
   });

    it("delete statement - where clause", () => {
        let result = qp.getCollection("delete from games where playerName=Jackson;", "delete");
        assert.equal(result, "games");
    });

    it("delete statement - nested collection with slashes", () => {
        let result = qp.getCollection("delete from games/this/object;", "delete");
        assert.equal(result, "games/this/object");
    });

    it("delete statement - nested collection with slashes with where clause", () => {
        let result = qp.getCollection("delete from games/this/object where playerName=Jackson;", "delete");
        assert.equal(result, "games/this/object");
    });

    it("delete statement - no collection given with whitespace", () => {
        let query = "delete from ;";
        assert.throws(() => qp.getCollection(query, "delete"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });

    it("delete statement - no collection given without whitespace", () => {
        let query = "delete from;";
        assert.throws(() => qp.getCollection(query, "delete"), Error,
            "getCollection(): could not determine collection, missing from statement")
    });
});


/* Tests for getOrderBys */
describe("getOrderBys", () => {
    it("single column ascending", () => {
        let result = qp.getOrderBys("select * from games order by name");
        assert.deepStrictEqual(result, [{ascending: true, colName: "name"}]);
    });

    it("single column descending", () => {
        let result = qp.getOrderBys("select * from games order by name desc");
        assert.deepStrictEqual(result, [{ascending: false, colName: "name"}]);
    });

    it("multiple columns all ascending", () => {
        let result = qp.getOrderBys("select * from games order by name, skill, height");
        assert.deepStrictEqual(result, [{ascending: true, colName: "name"},
            {ascending: true, colName: "skill"}, {ascending: true, colName: "height"}])
    });

    it("multiple columns all descending", () => {
        let result = qp.getOrderBys("select * from games order by name desc, skill desc, height desc");
        assert.deepStrictEqual(result, [{ascending: false, colName: "name"},
            {ascending: false, colName: "skill"}, {ascending: false, colName: "height"}])
    });

    it("multiple column mixed ascending and descending", () => {
        let result = qp.getOrderBys("select * from games order by name, skill desc, height desc");
        assert.deepStrictEqual(result, [{ascending: true, colName: "name"},
            {ascending: false, colName: "skill"}, {ascending: false, colName: "height"}])
    });

    it("column with name separated by space - error condition", () => {
        let query = "select * from games order by this column asc";
        assert.throws(() => qp.getOrderBys(query),
            Error,
            "getOrderBys(): ORDER BY statement must be of the form: " +
            "ORDER BY col1, col2, ... ASC|DESC")
    });

    it("second string is not asc or desc - error condition", () => {
        let query = "select * from games order by this column cdb";
        assert.throws(() => qp.getOrderBys(query),
            Error,
            "getOrderBys(): ORDER BY statement must be of the form: " +
            "ORDER BY col1, col2, ... ASC|DESC")
    });

    it("no ORDER BY statement", () => {
        let result = qp.getOrderBys("select * from games");
        assert.equal(result, null);
    });
});


/* Tests for getSelectedFields */
describe("getSelectedFields", () => {
    it("select single field", () => {
        let result = qp.getSelectFields("select * from games");
        assert.deepStrictEqual(result, ["*"]);
    });

    it("select multiple fields", () => {
        let result = qp.getSelectFields("select this, that, other from games");
        assert.deepStrictEqual(result, ["this", "that", "other"]);
    });

    it("select - no fields", () => {
        let query = "select     from games";
        assert.throws(() => qp.getSelectFields(query),
            Error,
            "getSelectFields(): SELECT statement must be of the form " +
            "SELECT fields, ... FROM collection, ...");
    });
});

/* Tests for getWheres using SELECT statement */
describe("getWheres - SELECT statement", () => {
    it("basic SELECT statement", () => {
        let result = qp.getWheres("select * from games where playerName=Robert")
        assert.deepStrictEqual(result, [{field: "playerName", comparator: "=", value: "Robert"}]);
    });

    it("SELECT statement - multiple wheres", () => {
        let query = "select * from games where player != Robert and experience>=12 and expert=true"
        let ans = [{field: "expert", comparator: '=', value: true},
                   {field: 'experience', comparator: '>=', value: 12},
                   {field: 'player', comparator: '!=', value: 'Robert'}];
        let result = qp.getWheres(query);
        assert.deepStrictEqual(result, ans);
    });

    it("statement with WHERES and ORDER BY", () => {
        let query = "select * from games where player != Robert and experience>12 order by experience";
        let ans = [{field: 'player', comparator: '!=', value: 'Robert'},
                   {field: 'experience', comparator: '>', value: 12}];
        let result = qp.getWheres(query);
        assert.deepStrictEqual(result, ans);
    });

    it('statement with LIKE operator', () => {
        let query = "select * from games where player like '%R'";
        let ans = [{field: 'player', comparator: 'like', value: '%R'}]
        let result = qp.getWheres(query);
        assert.deepStrictEqual(result, ans);
    });

    it('statement with NOT LIKE operator', () => {
        let query = "select * from games where player not like '_R%'";
        let ans = [{field: 'player', comparator: '!like', value: '_R%'}]
        let result = qp.getWheres(query);
        assert.deepStrictEqual(result, ans);
    });

    it('statement with multiple WHEREs and mixed operators', () => {
        let query = "select * from games where player not like '_R%' and experience >= 5 and wins>20 and age=21";
        let ans = [{field: 'age', comparator: '=', value: 21},
                   {field: 'experience', comparator: '>=', value: 5},
                   {field: 'wins', comparator: '>', value: 20},
                   {field: 'player', comparator: '!like', value: '_R%'}];
        let result = qp.getWheres(query);
        assert.deepStrictEqual(result, ans);
    });
});
