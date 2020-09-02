let mocha = require('mocha');
let setup = require('../../scripts/init');
let describe = mocha.describe;
let it = mocha.it;

let user = setup.init_function();
console.log(user);
