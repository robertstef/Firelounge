// const helpers = require('./functionsInitHelper');
// const fs = require("fs");
// const path = require("path");
//
// let inputobj = {
//     language:"javascript", // or typescript
//     eslint: true,
//     run_npm: true
// };

/**
 * Initializes all necessary components for the functions
 * feature when initializing a new firebase project.
 *
 * @param path: String - path to project directory
 * @param input: Object: {language:String, eslint: boolean, run_npm: boolean}
 *
 *               Note language field must be either "javascript" or "typescript"
 */

module.exports = {
    functionsInit: function(proj_path, input) {

        const helpers = require('./functionsInitHelper');
        const fs = require("fs");
        const path = require("path");

        // verify input is correct
        helpers.check_input(input);

        // write functions directory
        let fcns_path = helpers.writeFcnsDir(proj_path);

        // create init files in functions directory
        if (input.language === 'javascript') {
            helpers.writeInitFilesJs(fcns_path, input);
        }
        else {
            // call function for typescript
        }

        // run npm
        if (input.run_npm) {
            helpers.npmInstaller(fcns_path);
        }
    }
}

// /* Just for testing */
// try {
//     let obj = {language:'javascript', eslint:true, run_npm:true};
//     //functionsInit("/Users/robertstefanyshin/FL_testdir/", obj);
// } catch(err) {
//     console.log(err.message);
// }
