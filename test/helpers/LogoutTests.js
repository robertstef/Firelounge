/* Checks to confirm logout functions correctly */ 
module.exports = {
    /* Opens Settings Modal */ 
    test1: async function (page) {
        
        await page.waitFor(5000);

        //click settings button
        await page.waitForSelector("#settings-modal-button");
        await page.hover("#settings-modal-button");
        await page.click("#settings-modal-button");

        //confirm username
        await page.waitForSelector("#settings-modal-user-username");
        text = await page.$eval("#settings-modal-user-username", element => element.innerText);
        expect(text).toBe(process.env.username)
    },
    
    /* Logout and Wait for Login Modal */ 
    test2: async function (page) {
        let text;

        await page.waitForSelector("#settings-modal-user-logout-button");
        await page.hover("#settings-modal-user-logout-button");
        await page.click("#settings-modal-user-logout-button");

        await page.waitFor(() => !document.querySelector("#circular-progress"));

        await page.waitFor(1000);

        //check contents of login modal
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

}