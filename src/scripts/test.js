module.exports = {
    test_function: function () {
        const { exec } = window.require('child_process');
        
        return new Promise((resolve, reject) => {
            
            const child_process = exec('pwd');

            //resolve with pwd 
            child_process.stdout.on('data', (data) => {
                resolve(data);
            });

            //if error - reject the promise
            child_process.stderr.on('data', (data) => {
                reject(data);
            });

            //close process and resolve code - if it hasnt been already
            child_process.on('close', (code) => {
                resolve(code);
            });    
        });
    }
};