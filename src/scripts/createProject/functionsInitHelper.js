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

let write_fcns_dir = (dir_path) => {
    let fcns_dir = path.join(dir_path, "/functions");

    // check if user has a directory named functions in their
    // folder already
    if (fs.existsSync(fcns_dir)) {

    }
}

write_fcns_dir();
/* Export statements */
exports.check_input = check_input;
