// Initializes the application after the user logs into firebase

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
function access_userfile(callback) {

    // get path to firelounge directory
    let path = os.userInfo().homedir + "/.firelounge/Users";

    // get username
    exec("firebase login --interactive", (error, stdout, stderr) => {

        if (error) { return error.message};
        if (stderr) { return stderr };

        let res = stdout.split(" ");
        res = res[res.length - 1];

        let uname = res.split("@");
        uname = uname[0];
        uname = uname.slice(4);

        callback(path, uname);
    });
}

// Gets users info and access their user file
access_userfile((path, uname) => {

    let u_path = path + `/${uname}.json`;

    // first time user
    if (! fs.existsSync(u_path)) {
        const content = {uname: uname};
        fs.writeFileSync(u_path, JSON.stringify(content), (err) => {
            if (err) {console.log(err.message)};
        })
    }
});
