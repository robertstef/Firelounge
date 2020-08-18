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
});

/* Tests for getParsedValue */
describe("getParsedValue", () => {
    it("numerical value", () => {
        assert.equal(qh.getParsedValue("5", false), 5);
    });

    it("boolean value", () => {
        assert.equal(qh.getParsedValue('true', false), true);
    });

    it("null value", () => {
        assert.equal(qh.getParsedValue('null', false), null);
    });

    it("string value", () => {
        assert.equal(qh.getParsedValue('myString', false), 'myString');
    });

    it("like wildcard - single quotes", () => {
        assert.equal(qh.getParsedValue('\'%or%\'', true), '%or%');
    });

    it("like wildcard - double quotes", () => {
        assert.equal(qh.getParsedValue('"a%"', true), 'a%');
    })
});


/* Tests for optimizeWheres */
describe("optimizeWheres", () => {
    it("first term is equals", () => {
        let wheres = [{comparator: '='}, {comparator: '<='}, {comparator: '>'}];
        assert.deepStrictEqual(qh.optimizeWheres(wheres), wheres);
    });

    it("first term NOT equals", () => {
        let wheres = [{comparator: '<='}, {comparator: '='}, {comparator: '>'}];
        let result = [{comparator: '='}, {comparator: '<='}, {comparator: '>'}];
        assert.deepStrictEqual(qh.optimizeWheres(wheres), result);
    });

    it("input does not contain equals", () => {
        let wheres = [{comparator: '<='}, {comparator: '!='}, {comparator: '>'}];
        assert.deepStrictEqual(qh.optimizeWheres(wheres), wheres);
    })
});
