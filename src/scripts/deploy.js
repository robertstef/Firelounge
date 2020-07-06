
/**
 * Deploys a users project to Firebase Hosting
 * @param: requestBody: object
 * Structure: {
 *     act_proj: the current active project
 *     deploy_options: {'hosting': true, 'storage': false, ...}
 * }
 *
 *  Note: will need to update the version number in the template file
 *
 */

module.exports = {
    deployProject_function: function(requestBody) {

        const {exec} = window.require('child_process');

        const project_id = requestBody.act_proj.id;

        const proj_path = requestBody.act_proj.path;

        if (requestBody.act_proj === '' || requestBody.act_proj === null) {
            console.log("NO ACTIVE PROJECT");
            return;
        }

        var deploy_options = requestBody.deployOptions;

        return new Promise((resolve, reject) => {
            var response;
            if (deploy_options.all === true) {
                const deploy_all = exec("firebase -P " + project_id + " deploy", {cwd: proj_path});

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

                const deploy_some = exec(`firebase -P ${project_id} deploy --only ` + options_arr.join(','), {cwd: proj_path});

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
