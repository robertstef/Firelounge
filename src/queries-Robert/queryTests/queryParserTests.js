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
})


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
    })
});
