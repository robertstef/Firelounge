/*

 ◯ Database: Deploy Firebase Realtime Database Rules (Y)
 ◯ Firestore: Deploy rules and create indexes for Firestore
 ◯ Functions: Configure and deploy Cloud Functions (Y)
 ◯ Hosting: Configure and deploy Firebase Hosting sites (Y)
 ◯ Storage: Deploy Cloud Storage security rules (NEED RESOURCE LOCATION)
 ◯ Emulators: Set up local emulators for Firebase features


firebase projects:create -n <proj-name> <proj-id>

    At then end:
    - create a firebase.json (config file that lists the projects configuration) (CHECK)
    - .firebaserc - stores the project aliases (CHECK)

    *******
    Create a google cloud project on firebase (no features)
        firebase projects:create -n <project-name> <project-id>,

    *******

 */

module.exports = {
    newProjectInit_function: function(requestBody) {
        const proj_name = requestBody.proj_name; // get the project name from the user

        const proj_id = proj_name + "-" + random_hex(); //create a project id

        const proj_path = requestBody.proj_path;

        const features = requestBody.config;

        console.log('Name:', proj_name);

        console.log('ID:', proj_id);

        console.log('Features:', features);

        console.log("RequestBody: ", requestBody);

        const active_path = ''; // this is taken from the user as well

        return new Promise((resolve, reject) => {

                    const {exec} = window.require('child_process');

                    var response;

                    //const create_proj = exec("firebase projects:create -n " +  proj_name +  " " + proj_id, {cwd: active_path});

                    const create_proj = exec("echo \"running my stuff\"");

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

let random_hex = () => {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 6; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
};

exports.random_hex = random_hex;

