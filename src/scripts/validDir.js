module.exports = {
    validDir_function: function (path) {
        const fs = require('fs');

        return new Promise((resolve, reject) => {
            if(path === '' || path === undefined) {
                reject(new Error('Path Empty'));
            }

            //check for .firebaserc file -- can add other files her when needed
            const path_rc = path.concat('/.firebaserc')

            //attempt access
            fs.access(path_rc, fs.F_OK, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(1)
                }
            });
        });
    }
};