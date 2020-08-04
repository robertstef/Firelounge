/* Defines helper functions for functionsInit.js */
const fs = window.require("fs");
const path = window.require("path");
const { spawn } = window.require("cross-spawn");

/**
 * Checks input to functionsInit() is of the correct form.
 *
 * @param input: Object given as input to functionsInit()
 */
exports.check_input = (input) => {

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
 *
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
 *
 * @param dir_path: String - path to users project directory
 * @return {String} - the path to the newly created functions directory
 */
exports.writeFcnsDir = (dir_path) => {
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

    return fcns_dir;
}

/**
 * Writes the following configuration files in the projects root directory
 * when the user selects javascript as their language for functions:
 *
 * index.js
 * package.json (with or without eslint dependency as per users selection)
 * .eslintrc (only if user selects use of eslint)
 * .gitignore
 *
 * NOTE: only use this function when the user selects javascript, if user selects
 *       typescript use the function writeInitFilesTs().
 *
 * @param fcns_path: String: path to functions directory in projects root directory
 * @param input: Object: {language:String, eslint: boolean, run_npm: boolean}
 */
exports.writeInitFilesJs = (fcns_path, input) => {

    /**
     * Writes the given content to the file specified by
     * the path, p.
     * @param p: String: path to file we want to write
     * @param content: Object|String: content to be written
     */
    let writeProjFile = (p, content) => {
        // Seems to be working without stringify???
        // Keep here just in case
        /*
        if (typeof context !== 'string') {
            content = JSON.stringify(content);
        }
         */

        fs.writeFileSync(p, content, "utf8");
    }

    // Read in file templates
    //const TEMPLATE_ROOT = path.resolve(__dirname, "../createProject/templates/javascript/");

    const TEMPLATE_ROOT = "src/scripts/createProject/templates/javascript";
    const INDEX_TEMPLATE = fs.readFileSync(path.join(TEMPLATE_ROOT, "index.js"), "utf8");
    const PACKAGE_LINTING_TEMPLATE = fs.readFileSync(path.join(TEMPLATE_ROOT, "package.lint.json"), "utf8");
    const PACKAGE_NO_LINTING_TEMPLATE = fs.readFileSync(path.join(TEMPLATE_ROOT, "package.nolint.json"), "utf8");
    const ESLINT_TEMPLATE = fs.readFileSync(path.join(TEMPLATE_ROOT, "eslint.json"), "utf8");
    const GITIGNORE_TEMPLATE = fs.readFileSync(path.join(TEMPLATE_ROOT, "_gitignore"), "utf8");

    // user wants to use eslint
    if (input.eslint) {
        // package.json to include eslint as dependency
        writeProjFile(path.join(fcns_path, "/package.json"), PACKAGE_LINTING_TEMPLATE);
        // .eslintrc file
        writeProjFile(path.join(fcns_path, "/.eslintrc.json"), ESLINT_TEMPLATE);

        // TODO in firebase.json file need to set functions.predeploy to ['npm --prefix "$RESOURCE_DIR" run lint]
        // TODO set $RESOURCE_DIR environment variable
    }
    // not using eslint
    else {
        // package.json not including eslint as dependecy
        writeProjFile(path.join(fcns_path, "/package.json"), PACKAGE_NO_LINTING_TEMPLATE)
    }

    // index.js
    writeProjFile(path.join(fcns_path, "/index.js"), INDEX_TEMPLATE);
    // .gitignore
    writeProjFile(path.join(fcns_path, "/.gitignore"), GITIGNORE_TEMPLATE);
}

/**
 * Installs the dependencies for the given directory.
 * @param dirpath: path to directory we want to init
 */
exports.npmInstaller = (dirpath) => {
    let installer = spawn("npm", ["install"], {
        cwd: dirpath,
        stdio: "inherit",
    });

    // May want to throw error here instead
    installer.on("error", (err) => {
        console.log(err.message());
    });

    // All done - make sure npm exited with code 0, else throw error
    installer.on('close', (code) => {
        if (code !== 0) {
            throw new Error("NPM install failed, please manually install dependencies using 'npm install' after" +
                " initialization");
        }
    });
}

/*
let obj = {language: 'javascript', eslint:false, run_npm:false};
writeInitFilesJs(obj, "/Users/robertstefanyshin/FL_testdir/functions");
 */

/* Export statements */
//exports.check_input = check_input;
//exports.writeFcnsDir = writeFcnsDir;
//exports.writeInitFilesJs = writeInitFilesJs;
