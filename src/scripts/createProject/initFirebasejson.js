/**
 *          Here is where we will handle the creation of the various files and the configuration of the firebase.json
 *                 , .firebaserc files and various other files associated therein.
 *
 *          Also, add the project to the userContext
 *
 */

module.exports = {
    initFireBasejson_function: function(requestBody) {

        const fs = window.require('fs');

        const proj_path = requestBody.proj_path; // the path of the users project

        const proj_id = requestBody.proj_id;

        const proj_name = requestBody.proj_name;

        let firebase = {}; // the firebase.json object we will be writing

        let firebaserc = {}; // the .firebaserc object we will be writing

        const features = requestBody.config; // the features that the project will have

        firebaserc['projects'] = {'default': proj_id};

        let options_arr = Object.keys(features)  //get the features for the project
            .filter(function (k) {
                return features[k]
            })
            .map(String);

        options_arr.forEach((value, index, array) => {

            switch (value) {
                case "hosting":

                    const options = requestBody[value];

                    const initHosting = require('../../scripts/createProject/initHosting');

                    initHosting.initHosting_function({options: options, proj_path: proj_path});

                    firebase[value] = {
                        "public": options.public_dir,
                        "ignore": [
                            "firebase.json",
                            "**/.*",
                            "**/node_modules/**"
                        ],
                    };

                    if (options.single_page_app) {
                        //create a ‘rewrites’ attribute within hosting
                        // Serves index.html for requests to files or directories that do not exist
                        firebase[value]['rewrites'] = [{
                            "source": "**",
                            "destination": "/index.html"
                        }]
                    }
                    break;

                case "database":
                    const rules_file = requestBody[value].rules;

                    const initDatabase = require('../../scripts/createProject/initDatabase');

                    initDatabase.initDatabase_function({rules_file: rules_file, proj_path: proj_path});

                    firebase[value] = {
                        rules: rules_file
                    };
                    break;

                case 'functions':
                    let arg = {
                      language: 'javascript', // default to js for now
                      eslint: requestBody.functions.lint,
                      run_npm: requestBody.functions.npm
                    };

                    let initfunctions = require('../../scripts/createProject/functionsInit');

                    initfunctions.functionsInit(proj_path, arg);

                    break;
            }
        });

        let fbjson_path = proj_path + '/firebase.json'; // path to the firebase.json file

        let fbrc_path = proj_path + '/.firebaserc'; // path to the .firebaserc file

        fs.writeFileSync(fbrc_path, JSON.stringify(firebaserc, null, 4));

        fs.writeFileSync(fbjson_path, JSON.stringify(firebase, null, 4));
        //TODO some sort of confirmation message that the project has been created
    }
};
