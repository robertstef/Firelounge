const { exec } = require('child_process');

module.exports = {
    login_function: function () {
        var response_obj = {}
        return new Promise((resolve, reject) => {
            
            const child_process = exec('firebase login --interactive --reauth');

            child_process.stdin.setEncoding('utf-8');
            child_process.stdin.write('n\n');
            child_process.stdin.end();

            //store stdout data in object
            child_process.stdout.on('data', (data) => {
                response_obj.stdout = data
            });

            //if error - reject the promise
            child_process.stderr.on('data', (data) => {
                response_obj.stderr = data
                response_obj.code = -1
                reject(response_obj);
            });

            //when child is finished, resolve the promise
            child_process.on('close', (code) => {
                response_obj.code = code
                resolve(response_obj);
            });    
        });
    }
};