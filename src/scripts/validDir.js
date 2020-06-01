const fs = require('fs');

module.exports = {
    validDir_function: function (path) {
        //check for .firebaserc file -- can add other files her when needed
        const path_rc = path.concat('/.firebaserc')

        return new Promise((resolve, reject) => {
            //attempt access
            fs.access(path_rc, fs.F_OK, (err) => {
            //if error - return -1
            if (err) {
                resolve(-1)
            } else {
                //if access return 1
                resolve(1)
            }
            });
        });
    }
};