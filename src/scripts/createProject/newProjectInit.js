/*
    Requirements:
    - a project directory (i.e. a path)
        - we get this from the user

    firebase init

    select features
    - this will be done prior
        - get this from the user

    We want to create a brand new project, how can we tell firebase to do this?
    - firebase projects:create
        - user can name it whatever they want
        - but the id must be unique (how do we get this unique id?)

        Then we need to provide an id:
        - project name?

        projectName - my-new-project
        projectID - projectName-hexValue


    At then end:
    - create a firebase.json (config file that lists the projects configuration) (CHECK)
    - .firebaserc - stores the project aliases (CHECK)

    *******
    Create a google cloud project on firebase (no features)
    firebase projects:create -n <project-name> <project-id>
    *******
        - functions, hosting, database are a go
            - for functions we need a package.json, package-lock.json, index.js)
 */

module.exports = {
    newProjectInit_function: function(requestBody) {
        const proj_name = requestBody.path; // get the project name from the user

        const proj_id = proj_name + "-" + random_hex(); //create a project id

        const active_path = ''; // this is taken from the user as well

        return new Promise((resolve, reject) => {

            const {exec} = require('child_process');

            var response;

            const create_proj = exec("firebase projects:create -n " +  proj_name +  " " + proj_id, {cwd: active_path});

            create_proj.stdin.setEncoding('utf-8');
            create_proj.stdin.write('n\n');
            create_proj.stdin.end();

            //store stdout data in object
            create_proj.stdout.on('data', (data) => {
                response = data
            });

            // if error reject promise
            create_proj.stderr.on('data', (data) => {
                reject(data);
            });

            //when child is finished, resolve the promise
            create_proj.on('close', (code) => {
                if(code === 0) {
                    resolve(response);
                } else {
                    reject(code)
                }
            })
        });

        /**
         * Here is where we will handle the creation of the various files and the configuration of the firebase.json
         * , .firebaserc files and various other files associated therein.
         */
    }
};

function random_hex() {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 6; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
}

console.log(random_hex())
