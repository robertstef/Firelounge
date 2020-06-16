const fs = require("fs");

let inputobj = {
    language:"javascript", // or typescript
    eslint: true,
    run_npm: true
};

/**
 * Checks input to functionsInit() is of the correct form.
 *
 * @param input: Object given as input to functionsInit()
 */
function check_input(input) {

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
 * Initializes all necessary components for the functions
 * feature when initializing a new firebase project.
 *
 * @param path: String - path to project directory
 * @param input: Object: {language:String, eslint: boolean, run_npm: boolean}
 *
 *               Note language field must be either "javascript" or "typescript"
 */
let functionsInit = (path, input) => {
    check_input(input);
}

try {
    let obj = {language:'javascript', eslint:true, run_npm:true};
    functionsInit("/", obj);
    console.log("all good");
} catch(err) {
    console.log(err.message);
}