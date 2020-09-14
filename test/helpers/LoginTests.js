/* Checks to confirm login page functions correctly */ 
module.exports = {
    /* Able to Logout of Account */ 
    test1: async function (page) {
        await page.waitFor(20000);

        //log out of account 
        const { exec } = require('child_process');
        const child_process = await exec('firebase logout');
        
        let response;
        //check return from child process
         child_process.stdout.on('data', (data) => {
            response = data
            response = response.split(' ')
            response = response[2]
        });

        //when child is finished, check the result
        child_process.on('close', (code) => {
            let expected = false;
            response === "to" || "Logged" ? expected = true : expected = false 
            
            expect(expected).toBe(true);
        });  

    },
     /* Login Modal Appears Correctly */ 
     test2: async function (page) {
        let text;
        
        //check header
        await page.waitForSelector("#login-text");
        text = await page.$eval("#login-text", element => element.innerText);
        expect(text).toBe("Please login with your Google account");

        //check text
        await page.waitForSelector("#login-header");
        text = await page.$eval("#login-header", element => element.innerText);
        expect(text).toBe("Welcome to Firelounge");

        //check button
        await page.waitForSelector("#login-button");
        text = await page.$eval("#login-button", element => element.innerText);
        expect(text).toBe("LOGIN");
    },

     /* Click and Confirm Login */ 
     test3: async function (page) {
        
        //Click login button
        await page.waitForSelector("#login-button");
        await page.click("#login-button");

        await page.waitFor(1000);

        await page.waitFor(() => !document.querySelector("#circular-progress"));

        await page.waitFor(1000);

        //click settings button
        await page.waitForSelector("#settings-modal-button");
        await page.hover("#settings-modal-button");
        await page.click("#settings-modal-button");
        
        await page.waitForSelector("#settings-modal-user-username");
        text = await page.$eval("#settings-modal-user-username", element => element.innerText);
        expect(text).toBe(process.env.username)

        await page.waitForSelector("#create-header");
        await page.hover("#create-header");
        await page.click("#create-header");
        text = await page.$eval("#create-header", element => element.innerText);
        expect(text).toBe("Create a new FireLounge project");

    },



}