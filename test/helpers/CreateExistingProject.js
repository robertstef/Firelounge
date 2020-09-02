/* Adds a existing project to firebase */
module.exports = {
    
    /* Content of Create Existing Project */
    test1: async function (page) {
        let text;
    
        //wait for dev server to start, init script to run
        await page.waitFor(5000);
        
        //navigate to add existing project page
        await page.waitForSelector("#create-existing-proj-icon");
        await page.click("#create-existing-proj-icon");
        
        //confirm what page were on
        await page.waitForSelector("#create-existing-proj-header" );
        text = await page.$eval("#create-existing-proj-header", element => element.innerText);
        expect(text).toBe("Already Have a Firebase Project?");
    },

    /* Create Existing Project Execution */
    test2: async function (page) {
        // click to add project 
        await page.waitForSelector("#create-existing-proj-button");
        await page.$eval( "#create-existing-proj-button", form => form.click() );

        // click to add project 
        await page.waitForSelector("#create-existing-proj-alert");
        text = await page.$eval("#create-existing-proj-alert", element => element.innerText);
        expect(text).toBe("Project Successfully Imported to Firelounge");  
    },
    
    /* Create Existing Project Navigate to Manage Page */ 
    test3: async function (page) {
        // click to navigate to deploy page 
        await page.waitForSelector("#manage-proj-icon");
        await page.click("#manage-proj-icon");

        // confirm deploy header is displayed
        await page.waitForSelector("#manage-deploy-proj-header");
        text = await page.$eval("#manage-deploy-proj-header", element => element.innerText);
        expect(text).toBe('Deploy Project');
    },
    
    /* Create Existing Project Confirmation */ 
    test4: async function (page) {
        // confirm proj id matches recently added project
        await page.waitForSelector("#manage-deploy-proj-title");
        text = await page.$eval("#manage-deploy-proj-title", element => element.innerText);
        expect(text).toBe(process.env.project_name);
    },
}