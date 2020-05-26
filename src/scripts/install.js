// Install script for the application

const os = require('os');
const fs = require('fs');

function create_dirs() {

    let home = os.userInfo().homedir;
    const fl_path = home + "/.firelounge";
    const u_path = home + "/.firelounge/Users";

    // see if they already have a .firelounge file
    if ( ! fs.existsSync(fl_path)) {
        fs.mkdirSync(fl_path);
    } else {
        // look for existing firelounge data
    }

    // check for user file
    if ( ! fs.existsSync(u_path)) {
        fs.mkdirSync(u_path)
    } else {
        // keep existing user data
    }
}
