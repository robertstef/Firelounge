
/*
    param: options - json object {'hosting': true, 'storage': false, ...}
 */

const {spawn} = require('child_process');

function deploy(options) {
    if (options.all === true) {
        console.log("firebase deploy everything");

        const fb_deploy = spawn('firebase', ['deploy']);

        fb_deploy.stdout.on('data', (data) => {
            console.log(`stdout:\n ${data}`);
        });

        fb_deploy.stderr.on('data', (data) => {
            console.error(`stderr:\n ${data}`);
        });

        fb_deploy.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

    } else {
        let options_arr = Object.keys(options)
            .filter(function(k){return options[k]})
            .map(String);

        console.log("firebase deploy --only " + options_arr.join(','));

        const fb_deploy_options = spawn('firebase', ['deploy', '--only', options_arr.join(',')]);

        fb_deploy_options.stdout.on('data', (data) => {
            console.log(`stdout:\n ${data}`);
        });

        fb_deploy_options.stderr.on('data', (data) => {
            console.error(`stderr:\n ${data}`);
        });

        fb_deploy_options.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

    }
}


