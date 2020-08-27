module.exports = {
    logout_function: function () {
        const { exec } = window.require('child_process');
        
        return new Promise((resolve, reject) => {
            var response;
            const child_process = exec('firebase logout');

            child_process.stdin.setEncoding('utf-8');
            child_process.stdin.write('n\n');
            child_process.stdin.end();

            //store stdout data in object
            child_process.stdout.on('data', (data) => {
                response = data
            });

            //if error - reject the promise
            child_process.stderr.on('data', (data) => {
                reject(data);
            });

            //when child is finished, resolve the promise
            child_process.on('close', (code) => {
                if(code === 0) {
                    resolve(response);    
                } else {
                    reject(code)
                }
                
            });    
        });
    }
};