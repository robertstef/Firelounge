const helpers = require('./functionsInitHelper');
const fs = require("fs");
const path = require("path");

let inputobj = {
    language:"javascript", // or typescript
    eslint: true,
    run_npm: true
};

// Read in file templates

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
    let fcns_path = helpers.writeFcnsDir(path);

    // create init files in functions directory
    if (input.language === 'javascript') {
        helpers.writeInitFilesJs(fcns_path, input);
    }
    else {
       // call function for typescript
    }
}

/* Just for testing */
/*
try {
    let obj = {language:'javascript', eslint:true, run_npm:true};
    functionsInit("/Users/robertstefanyshin/FL_testdir/", obj);
} catch(err) {
    console.log(err.message);
}
 */