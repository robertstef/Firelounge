
/**
 * Deploys a users project to Firebase Hosting
 * @param: options - json object {'hosting': true, 'storage': false, ...}
 */


function deploy(options) {

    //var user_json = require('../Users/' + username + '.json');

    var user_json = require("../Users/testusername.json");

    var active_proj = user_json.activeProject; // get the active project of the current user

    if (active_proj === undefined) {
        console.log("NO ACTIVE PROJECT");
        return;
    }

    var active_path = user_json.projects[active_proj].path.toString(); // get the path to the active project

    const {exec} = require('child_process');

    // execute the corresponding firebase deploy command based on options selected in the users current active project directory.
    if (options.all === true) {
        exec("firebase deploy", {cwd: active_path}, (error, stdout, stderr) => {
            if (error) {
                console.error(`DEPLOY UNSUCCESSFUL:     ERROR: ${error}`);
                return;
            }
            console.log("DEPLOY SUCCESS");
        });

    } else {
        let options_arr = Object.keys(options)
            .filter(function(k){return options[k]})
            .map(String);
        exec("firebase deploy --only" + options_arr.join(','), {cwd: active_path}, (error, stdout, stderr) => {
            if (error) {
                console.error(`DEPLOY UNSUCCESSFUL:     ERROR: ${error}`);
                return;
            }
            console.log("DEPLOY SUCCESS");
        });
    }
}
