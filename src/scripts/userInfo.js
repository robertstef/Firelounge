// Initializes the application after the user logs into firebase

const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');

/**
 * Obtains the current users user name. On success resolves with
 * the users username, on error rejects with the errors message.
 *
 * @returns {Promise<any>}
 */
function get_uname() {

    return new Promise((resolve, reject) => {
        exec('firebase login --interactive', (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            }

            let res = stdout.split(" ");
            res = res[res.length - 1];

            let uname = res.split("@");
            uname = uname[0];
            uname = uname.slice(4);

            resolve(uname);
        })
    });
}

/**
 * Loads the user file for the current user.
 * @param uname
 * @returns {Promise<any>}: Resolves with an Object of the form:
 *                          {active_project:String,
 *                           projects:{ proj1: { name: String
 *                                               path: String
 *                                               features: Array of strings }}}}
 *
 */
function get_ufile_info(uname) {
    return new Promise((resolve, reject) => {

        // path to users firelounge file
        let path = os.userInfo().homedir + "/.firelounge/Users" + `/${uname}.json`;

        // existing user - load their info
        if (fs.existsSync(path)) {
            let rawdata = fs.readFileSync(path);
            let data = JSON.parse(rawdata);

            if (data.activeProject === undefined) {
                reject("User file corrupted - active project information not found");
            }
            else if (data.projects === undefined) {
                reject("User file corrupted  - project information not found");
            }
            else {
                resolve(data);
            }
        }
        // new user - resolve with object with empty fields
        else {
            resolve({act_proj: "", projects: {}});
        }
    });
}

/**
 * Returns an object with all necessary fields to create a new User object.
 * @returns An object of the form:
 *          {uname: String,
 *           act_proj:String,
 *           projects:{}}
 */
let user_info = async function() {
    try {
        let uname = await get_uname();
        let ufile = await get_ufile_info(uname);
        let user = {};

        // log username
        user.uname = uname;
        user.act_proj = ufile.activeProject;
        user.projects = ufile.projects;

        return user;
    }
    catch (err) {
        console.log(err);
    }
};

/* Export user_info() */
exports.user_info = user_info;
