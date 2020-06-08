// Initializes the application after the user logs into firebase
import {fb_projlist} from "./projectList";

const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Obtains the necessary credentials to access to current
 * users firelounge user file. Reading/writing to the file
 * will be specified in the callback function.
 *
 * @param callback function to read/write to the users file
 */
function get_uname(callback) {

    // get path to firelounge directory
    let path = os.userInfo().homedir + "/.firelounge/Users";

    // get username
    exec("firebase login --interactive", (error, stdout, stderr) => {

        if (error) { return error.message};
        //if (stderr) { return stderr };

        let res = stdout.split(" ");
        res = res[res.length - 1];

        let uname = res.split("@");
        uname = uname[0];
        uname = uname.slice(4);

        callback(path, uname);
    });
}

/**
 * Reads in the user file from ~/.firelounge/Users if a
 * repeat user, or creates the the userfile if a first
 * time user.
 */
function load_ufile() {

    // Gets users info and access their user file
    get_uname((path, uname) => {

        let u_path = path + `/${uname}.json`;
        let ufile = {};

        // first time user
        if (! fs.existsSync(u_path)) {
            ufile.uname = uname;
        }
        // existing user
        else {
            let rawdata = fs.readFileSync(u_path);
            ufile = JSON.parse(rawdata);
            console.log(ufile);
        }
    });
}

