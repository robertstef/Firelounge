/**
 * Handles the creation of new files and directories within creation of a project with feature database
 * @param: args - object containing the required information from the initFirebasejson.js file
 *      @format : {
 *          rules_file: name of the rules file to be used
 *          proj_path: project path
 *      }
 *
 */

module.exports = {
    initDatabase_function: function(args) {
        //TODO check validity of the file chosen (the file is a json file with correct structure)

        const fs = window.require('fs');

        const proj_path = args.proj_path;

        const rules_file = args.rules_file;

        if (!fs.existsSync(`${proj_path}/${rules_file}`)) { // if the rules file doesnt exist
            // initialize the rules to default
            let db_rules = {
                rules : {
                    ".read": "auth != null",
                    ".write": "auth != null"
                }
            };

            // create the file
            fs.writeFileSync(`${proj_path}/${rules_file}`, JSON.stringify(db_rules, null, 4));

            // set the firebase.json object
        }
    }
};
