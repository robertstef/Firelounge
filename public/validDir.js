module.exports = {
    validDir_function: function (path) {
        const fs = require('fs');

        return new Promise((resolve, reject) => {
            if(path === '' || path === undefined) {
                reject(new Error('Path Empty'));
            }

            //check for .firebaserc file -- can add other files her when needed
            const path_rc = path.concat('/.firebaserc');
            const path_json = path.concat('/firebase.json');

            // .firebaserc
            if ( ! fs.existsSync(path_rc) ) {
                reject("Invalid directory, it does not contain .firebaserc file");
            }
            // firebase.json
            else if ( ! fs.existsSync(path_json) ) {
                reject("Invalid directory, it does not contain firebase.json file");
            }
            else { resolve(1) }
        });
    }
};