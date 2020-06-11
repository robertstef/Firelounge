
/**
 * Deploys a users project to Firebase Hosting
 * @param: options - json object {'hosting': true, 'storage': false, ...}
 */

/*
 */



module.exports = {
    deployProject_function: function(requestBody) {
        const {exec} = window.require('child_process');
        
        //var user_json = require('../Users/' + username + '.json');

        var user_json = require("../Users/testusername.json"); // just use the testing json for now

        var active_proj = user_json.activeProject; // get the active project of the current user

        if (active_proj === undefined) {
            console.log("NO ACTIVE PROJECT");
            return;
        }

       //var active_path = user_json.projects[active_proj].path.toString(); // get the path to the active project

        var active_path = '/Users/jacksonschuler/WebstormProjects/opench-firebase';

        var deploy_options = requestBody;

        return new Promise((resolve, reject) => {
            var response;
            if (deploy_options.all === true) {
                const deploy_all = exec("firebase deploy", {cwd: active_path});

                deploy_all.stdin.setEncoding('utf-8');
                deploy_all.stdin.write('n\n');
                deploy_all.stdin.end();

                //store stdout data in object
                deploy_all.stdout.on('data', (data) => {
                    response = data
                });

                // if error reject promise
                deploy_all.stderr.on('data', (data) => {
                    reject(data);
                });

                //when child is finished, resolve the promise
                deploy_all.on('close', (code) => {
                    if(code === 0) {
                        resolve(response);
                    } else {
                        reject(code)
                    }
                })
            } else {
                let options_arr = Object.keys(deploy_options)
                    .filter(function(k){return deploy_options[k]})
                    .map(String);

                const deploy_some = exec("firebase deploy --only" + options_arr.join(','), {cwd: active_path});

                deploy_some.stdin.setEncoding('utf-8');
                deploy_some.stdin.write('n\n');
                deploy_some.stdin.end();

                //store stdout data in object
                deploy_some.stdout.on('data', (data) => {
                    response = data
                });

                // if error reject promise
                deploy_some.stderr.on('data', (data) => {
                    reject(data);
                });

                //when child is finished, resolve the promise
                deploy_some.on('close', (code) => {
                    if(code === 0) {
                        resolve(response);
                    } else {
                        reject(code)
                    }
                })
            }
        })
    }
};
