module.exports = {
    checkLoginStatus_function: function () {
        const { exec } = window.require('child_process');
        
        return new Promise((resolve, reject) => {
            var response;
            const child_process = exec('firebase login --interactive');

            child_process.stdin.setEncoding('utf-8');
            child_process.stdin.write('n\n');
            child_process.stdin.end();

            //check first resposne to see if user is logged in
            child_process.stdout.on('data', (data) => {
                response = data

                response = response.split(" ");
                response =response[0]

                if(response === 'Already') {
                    //logged in
                    resolve('Logged In')
                    child_process.kill('SIGINT');
                } else {
                    //not logged int
                    resolve('')
                    child_process.kill('SIGINT');
                }

                
            });

            //if error - reject the promise
            child_process.stderr.on('data', (data) => {
                
                reject(data);
            });
                
        });   
    }
};