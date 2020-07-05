/**
 * Handles the creation of new files and directories within creation of a project with feature hosting
 * @param: args - object containing the required information from the initFirebasejson.js file
 *      @format : {
 *          options: options for hosting, such as public directory name, etc.
 *          proj_path: project path
 *      }
 *
 */

module.exports = {
    initHosting_function: function(args) {

        const fs = window.require('fs');

        const options = args.options;

        const proj_path = args.proj_path;

        let public_dir = `${proj_path}/${options.public_dir}`;

        if (!fs.existsSync(public_dir)) {    // if the dir doesnt exist
            fs.mkdirSync(public_dir);   // create the directory and add the index.html file
            fs.copyFile('src/template/index.html', `${public_dir}/index.html`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            // the folder exists check for the index.html, if it exists, do we overwrite?
            if (!fs.existsSync(`${public_dir}/index.html`)) {
                //the index.html doesnt exist so use Googles default
                fs.copyFile('src/template/index.html', `${public_dir}/index.html`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                // the index.html file exists (probably want to use it)
                //TODO possibly prompt the user and somehow ask if they want to use this index.html or the default
            }
        }

        if (!options.single_page_app) {
            fs.copyFile('src/template/404.html', `${public_dir}/404.html`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }

    }
};
