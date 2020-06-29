/**
    Create a new google cloud project on firebase (no features)
        firebase projects:create -n <project-name> <project-id>,

    @param: requestBody: a two index array
        index 0: the project name given as input
        index 1: the path to the project
        index 2: the project id, a string which contains the name and a hexadecimal identifier
                - all lowercase, no spaces
 */

module.exports = {
    createCloudProject_function: function(requestBody) {
        let proj_name = requestBody[0]; // the project name, given by the user

        const proj_path = requestBody[1]; // path to location the user intends to store the project

        const proj_id = requestBody[2]; // the project id

        console.log(requestBody);

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

                    //when child is finished, resolve the promise
                    create_proj.on('close', (code) => {
                        if(code === 0) {
                            console.log("PROJECT HAS BEEN CREATED!!!");
                            resolve("SUCCESS");
                        } else {
                            reject("FAIL")
                        }
                    })
                });


    }
};



