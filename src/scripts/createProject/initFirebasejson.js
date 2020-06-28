/**
 *          Here is where we will handle the creation of the various files and the configuration of the firebase.json
 *                 , .firebaserc files and various other files associated therein.
 *
 *          Also, add the project to the userContext
 *
 */


/*
proj_name: "proj name"
proj_path: "/Library"
isHostingOpen: true
hosting:
    public_dir: "public_dir"
    single_page_app: true

config:
    hosting: true
    database: false
    storage: false
    functions: false
 */

module.exports = {
    initFireBasejson_function: function(requestBody) {

        const fs = window.require('fs');

        const proj_path = requestBody.proj_path; // the path of the users project

        const proj_id = requestBody.proj_id;

        const proj_name = requestBody.proj_name;

        let firebase = {}; // the firebase.json object we will be writing

        const features = requestBody.config; // the features that the project will have

        let options_arr = Object.keys(features)  //get the features for the project
            .filter(function(k){return features[k]})
            .map(String);

        options_arr.forEach((value, index, array) => {

            switch(value) {
                case "hosting":
                    // full hosting config
                    // https://firebase.google.com/docs/hosting/full-config

                    const options = requestBody[value];

                    //TODO: check that the selected public dir exists in the cwd, if yes, use that directory, else create directory with an index.html file

                    let public_dir = `${proj_path}/${options.public_dir}`;

                    if (!fs.existsSync(public_dir)){    // if the dir doesnt exist
                        fs.mkdirSync(public_dir);   // create it
                    } else {
                        // the folder exists check for the index.html, if it exists, do we overwrite?
                        if (!fs.existsSync(`${public_dir}/index.html`)) {
                            //the index.html doesnt exist so use Googles default
                        } else {
                            // the index.html file exists (probably want to use it)
                            //TODO possibly prompt the user and somehow ask if they want to use this index.html or the default
                        }
                    }

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
                    } else {
                        //provide Google's 404.html file in public directory



                    }
                    break;
            }
        });

        let fbjson_path = proj_path + '/firebase.json';

        console.log("Writing firebase.json file....");

        fs.writeFile(fbjson_path, JSON.stringify(firebase,null, 4),  function (err, data) {
            if (err) {
               console.log(err)
           }
        });

        //TODO add project to the userObject

        // {id: "", name: "", path: ""}

        // this needs to happen AFTER the files have been written

        let new_proj = {
            id: `${proj_id}`,
            name: `${proj_name}`,
            path: `${proj_path}`
        };



        //TODO some sort of confirmation message that the project has been created
    }
};
