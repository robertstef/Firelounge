/**
    Create a new google cloud project on firebase (no features)
        firebase projects:create -n <project-name> <project-id>,

    @param: requestBody: a two index array
        index 0: the project name given as input
        index 1: the project id, a string which contains the name and a hexadecimal identifier
                - all lowercase, no spaces
 */

module.exports = {
    createCloudProject_function: function(requestBody) {
        let proj_name = requestBody[0]; // the project name, given by the user

        let proj_id = proj_name + "-" + random_hex(); // project id, a name with a hex value associated with, cannot have spaces

        proj_id = proj_id.replace(/\s+/g, '-').toLowerCase(); // format "the-name-e84ef"

        const proj_path = requestBody[1]; // path to location the user intends to store the project

        return new Promise((resolve, reject) => {

                    const {exec} = window.require('child_process');

                    var response;

                    //const create_proj = exec("firebase projects:create -n '" + proj_name + "' '" + proj_id + "'", {cwd: proj_path});

                    const create_proj = exec("echo \"Creating Cloud Project...\""); // for testing

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
                            console.log("PROJECT HAS BEEN CREATED!!!");
                            resolve(response);
                        } else {
                            reject(code)
                        }
                    })
                });


    }
};
/**
 * Generate a random 5 digit hex value to ensure a unique project id
 * @returns {string} - the randomized 5 digit hex value
 */
let random_hex = () => {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 5; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
};

exports.random_hex = random_hex;

