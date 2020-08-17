const qh = require('../parser/queryHelper');
const assert = require('assert');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

/* Tests for determineComparatorAndIndex */
describe("determineComparatorAndIndex", () => {
    it("Not equal with !=", () => {
        let where = "player != game";
        let {comparator, index} = qh.determineComparatorAndIndex(where);
        assert.equal(comparator, "!=");
        assert.equal(index, where.indexOf("!="));
    });

    it("Not equal with <>", () => {
        let where = "player<>game";
        let {comparator, index} = qh.determineComparatorAndIndex(where);
        assert.equal(comparator, "!=");
        assert.equal(index, where.indexOf("<>"));
    });

    it("Equals operator", () => {
        let where = "this=that";
        let {comparator, index} = qh.determineComparatorAndIndex(where);
        assert.equal(comparator, "=");
        assert.equal(index, where.indexOf("="));
    });

    it("Greater than operator", () => {
        let where = "this > that";
        let {comparator, index} = qh.determineComparatorAndIndex(where);
        assert.equal(comparator, ">");
        assert.equal(index, where.indexOf(">"));
    });

    it("Invalid operator", () => {
        let where = "this !! that";
        assert.throws(() => qh.determineComparatorAndIndex(where),
            Error,
            "determineComparatorAndIndex: invalid comparison operator");
    });
})