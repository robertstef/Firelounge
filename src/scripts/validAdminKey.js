module.exports = {
    validAdminKey_function: function (path, projectId) {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
            if(path === '' || path === undefined) {
                console.log('path empty')
                reject(new Error('Path Empty'));
            }

            /*
            Open API key and confirm:
                -It contains a key
                -the project ids match
            */
            try {
                var key = fs.readFileSync(path)	
                key = JSON.parse(key)
            } catch (error) {
                reject("Could not Open file -- the file is most likely not a JSON file");
            }
            
            if(projectId !== key.project_id){
                reject("The files Project Id does not match the active Firelounge Project");
            } else if (key.private_key === undefined) {
                reject("File does not contain a Private Key");
            }else {
                resolve('ok')
            }
        });
    }
};