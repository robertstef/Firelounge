const helpers = require('./functionsInitHelper');
const fs = require("fs");
const os = require("os");
const path = require("path");

let inputobj = {
    language:"javascript", // or typescript
    eslint: true,
    run_npm: true
};


/**
 * Initializes all necessary components for the functions
 * feature when initializing a new firebase project.
 *
 * @param path: String - path to project directory
 * @param input: Object: {language:String, eslint: boolean, run_npm: boolean}
 *
 *               Note language field must be either "javascript" or "typescript"
 */
let functionsInit = (path, input) => {
    // verify input is correct
    helpers.check_input(input);

    // write functions directory
    let dir_path = path.join(path, "/functions");
    fs.mk
}

try {
    let obj = {language:'javascript', eslint:true, run_npm:true};
    functionsInit("/", obj);
    console.log("all good");
} catch(err) {
    console.log(err.message);
}