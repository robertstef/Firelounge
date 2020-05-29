const { exec } = require('child_process');

module.exports = {
    test_function: function () {
        var response_obj = {}
        return new Promise((resolve, reject) => {
            
            const child_process = exec('pwd');

            //store stdout data in object
            child_process.stdout.on('data', (data) => {
                // console.log(`stdout:\n ${data}`);
                response_obj.stdout = data
            });

            //if error - reject the promise
            child_process.stderr.on('data', (data) => {
                // console.error(`stderr:\n ${data}`);
                response_obj.stderr = data
                response_obj.code = -1
                reject(response_obj);
            });

            //when child is finished, resolve the promise
            child_process.on('close', (code) => {
                // console.log(`child process exited with code ${code}`);
                response_obj.code = code
                resolve(response_obj);
            });    
        });
    }
};