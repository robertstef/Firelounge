/* Defines helper functions for functionsInit.js */
const fs = require("fs");
const path = require("path");

/**
 * Checks input to functionsInit() is of the correct form.
 *
 * @param input: Object given as input to functionsInit()
 */
let check_input = (input) => {

    const propertyError = () => {
        throw new Error("functionsInit() input object must be of the form {input:String, eslint: bool," +
            " run_npm: bool");
    }

    // Check each property is present
    if ((input.language === undefined) || (input.eslint === undefined) || (input.run_npm === undefined)) {
        propertyError();
    }

    // check each property field is correct
    for (let k of Object.keys(input)) {
        if (k === "language") {
            if ((input[k] !== 'javascript') && (input[k] !== 'typescript')) {
                throw new Error("Functions can only be initialized to javascript or typescript");
            }
        }
        else if (k === "eslint") {
            if (typeof input.eslint !== "boolean") {
                propertyError();
            }
        }
        else if (k === "run_npm") {
            if (typeof input.run_npm !== "boolean") {
                propertyError();
            }
        }
    }
}

/**
 * Produces a random 6 digit hexidecimal number.
 * @returns {string}: 6 digit hex number
 */
let random_hex = () => {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 6; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
}

/**
 * Creates the functions directory in the users project directory
 * specified by the inputted path.
 * @param dir_path: String - path to users project directory
 */
let write_fcns_dir = (dir_path) => {
    let fcns_dir = path.join(dir_path, "/functions");

    // User already has a directory named functions
    if (fs.existsSync(fcns_dir)) {
        // try naming dir functions-fb
        let fb_path = fcns_dir + "-fb";
        if (! fs.existsSync(fb_path)) {
            fs.mkdirSync(fb_path);
            fcns_dir = fb_path;
        }
        // for some reason that also exists name using a random hex value
        else {
            let flag = true;
            // keep producing random hex values until we find one that works --
            // maybe overkill but will ensure we don't overwrite any of their data
            while (flag) {
                let hex_val = random_hex();
                let hex_path = fcns_dir + "-" + hex_val;
                if (! fs.existsSync(hex_path)) {
                    fs.mkdirSync(hex_path);
                    fcns_dir = hex_path;
                    flag = false;
                }
            }
        }
    }
    // no pre-existing functions file
    else {
        fs.mkdirSync(fcns_dir);
    }
    // TODO set RESOURCE_DIR env variable for use by firebase.json
}

/* Export statements */
exports.check_input = check_input;
exports.write_fcns_dir = write_fcns_dir;
