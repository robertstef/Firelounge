/* Tests the functionality of Deploying a Project */ 
module.exports = {

    /* Confirm Deploy Page Header */
    test1: async function (page) {
        await page.waitFor(5000);
        let text;

        // confirm deploy header is displayed
        await page.waitForSelector("#manage-deploy-proj-header");
        text = await page.$eval("#manage-deploy-proj-header", element => element.innerText);
        expect(text).toBe('Deploy Project');
    },

    /* Confirm All Button is Displayed */
    test2: async function (page) {
        let text;
        await page.waitForSelector("#manage-deploy-switch-all");
        text = await page.$eval("#manage-deploy-switch-all", element => element.name);
        expect(text).toBe('all');
    },

     /* Confirm Hosting Button is Displayed */
     test3: async function (page) {
        let text;
        await page.waitForSelector("#manage-deploy-switch-hosting");
        text = await page.$eval("#manage-deploy-switch-hosting", element => element.name);
        expect(text).toBe('hosting');
    },

     /* Confirm Databse Button is Displayed */
     test4: async function (page) {
        let text;
        await page.waitForSelector("#manage-deploy-switch-database");
        text = await page.$eval("#manage-deploy-switch-database", element => element.name);
        expect(text).toBe('database');
    },

    /* Confirm Storage Button is Displayed */
    test5: async function (page) {
        let text;
        await page.waitForSelector("#manage-deploy-switch-storage");
        text = await page.$eval("#manage-deploy-switch-storage", element => element.name);
        expect(text).toBe('storage');
    },

    /* Confirm Functions Button is Displayed */
    test6: async function (page) {
        let text;
        await page.waitForSelector("#manage-deploy-switch-functions");
        text = await page.$eval("#manage-deploy-switch-functions", element => element.name);
        expect(text).toBe('functions');
    },

    /* Confirm Hosting Switch Functions Correctly */
    test7: async function (page) {
        let text;

        //click hosting switch
        await page.waitForSelector("#manage-deploy-switch-hosting");
        await page.click("#manage-deploy-switch-hosting");

        //confirm button is checked
        await page.waitForSelector("#manage-deploy-switch-hosting");
        text = await page.$eval("#manage-deploy-switch-hosting", element => element.checked);
        expect(text).toBe(true);
    },

    /* Confirm All Switch Functions Correctly */
    test8: async function (page) {
        let text;

        //click all switch
        await page.waitForSelector("#manage-deploy-switch-all");
        await page.click("#manage-deploy-switch-all");

        //confirm button is checked
        await page.waitForSelector("#manage-deploy-switch-all");
        text = await page.$eval("#manage-deploy-switch-all", element => element.checked);
        expect(text).toBe(true);
    },

     /* Confirm All Switch Toggles Other Switches To True */
     test9: async function (page) {
        let text;

        if(process.env.project_features.includes('hosting')){
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-hosting");
            text = await page.$eval("#manage-deploy-switch-hosting", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('database')){
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-database");
            text = await page.$eval("#manage-deploy-switch-database", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('storage')){
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-storage");
            text = await page.$eval("#manage-deploy-switch-storage", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('functions')){
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-functions");
            text = await page.$eval("#manage-deploy-switch-functions", element => element.checked);
            expect(text).toBe(true);
        }
    },

    /* Confirm All Switch Disables Other Switches Correctly */
    test10: async function (page) {
        let text;

        if(process.env.project_features.includes('hosting')){
            await page.waitForSelector("#manage-deploy-switch-hosting");
            await page.click("#manage-deploy-switch-hosting");
            
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-hosting");
            text = await page.$eval("#manage-deploy-switch-hosting", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('database')){
            await page.waitForSelector("#manage-deploy-switch-database");
            await page.click("#manage-deploy-switch-database");

            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-database");
            text = await page.$eval("#manage-deploy-switch-database", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('storage')){
            await page.waitForSelector("#manage-deploy-switch-storage");
            await page.click("#manage-deploy-switch-storage");

            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-storage");
            text = await page.$eval("#manage-deploy-switch-storage", element => element.checked);
            expect(text).toBe(true);
        }

        if(process.env.project_features.includes('functions')){
            await page.waitForSelector("#manage-deploy-switch-functions");
            await page.click("#manage-deploy-switch-functions");
            
            //confirm button is checked
            await page.waitForSelector("#manage-deploy-switch-functions");
            text = await page.$eval("#manage-deploy-switch-functions", element => element.checked);
            expect(text).toBe(true);
        }
    },

    /* Confirm All Switch Toggles Other Switches To False */
    test11: async function (page) {
        let text;

        //Toggle all switch to false
        await page.waitForSelector("#manage-deploy-switch-all");
        await page.click("#manage-deploy-switch-all");

        //confirm its false
        await page.waitForSelector("#manage-deploy-switch-all");
        text = await page.$eval("#manage-deploy-switch-all", element => element.checked);
        expect(text).toBe(false);

        if(process.env.project_features.includes('hosting')){
            //confirm button is false
            await page.waitForSelector("#manage-deploy-switch-hosting");
            text = await page.$eval("#manage-deploy-switch-hosting", element => element.checked);
            expect(text).toBe(false);
        }

        if(process.env.project_features.includes('database')){
            //confirm button is false
            await page.waitForSelector("#manage-deploy-switch-database");
            text = await page.$eval("#manage-deploy-switch-database", element => element.checked);
            expect(text).toBe(false);
        }

        if(process.env.project_features.includes('storage')){
            //confirm button is false
            await page.waitForSelector("#manage-deploy-switch-storage");
            text = await page.$eval("#manage-deploy-switch-storage", element => element.checked);
            expect(text).toBe(false);
        }

        if(process.env.project_features.includes('functions')){
            //confirm button is false
            await page.waitForSelector("#manage-deploy-switch-functions");
            text = await page.$eval("#manage-deploy-switch-functions", element => element.checked);
            expect(text).toBe(false);
        }
    },


    /* Confirm Deploy Hosting Functions Correctly */
    test12: async function (page) {
        let text;

        //Toggle hosting switch to true
        await page.waitForSelector("#manage-deploy-switch-hosting");
        await page.click("#manage-deploy-switch-hosting");

        //confirm its true
        await page.waitForSelector("#manage-deploy-switch-hosting");
        text = await page.$eval("#manage-deploy-switch-hosting", element => element.checked);
        expect(text).toBe(true);

        //Click deploy button
        await page.waitForSelector("#manage-deploy-button");
        await page.click("#manage-deploy-button");

        //check alert to confirm successful 
        await page.waitForSelector("#manage-deploy-alert-header");
        text = await page.$eval("#manage-deploy-alert-header", element => element.innerText);
        expect(text).toBe('Project has been deployed!');

        //check alert to confirm successful 
        await page.waitForSelector("#manage-deploy-alert-message");
        text = await page.$eval("#manage-deploy-alert-message", element => element.innerText);
        expect(text).toBe('Hosting URL: ' + process.env.project_url);
    },

    /* Confirm Deploy All Functions Correctly */
    test13: async function (page) {
        let text;

        await page.waitFor(5000);       

        //Toggle all switch to true
        await page.waitForSelector("#manage-deploy-switch-all");
        await page.click("#manage-deploy-switch-all");

        //confirm its true
        await page.waitForSelector("#manage-deploy-switch-all");
        text = await page.$eval("#manage-deploy-switch-all", element => element.checked);
        expect(text).toBe(true);

        //Click deploy button
        await page.waitForSelector("#manage-deploy-button");
        await page.click("#manage-deploy-button");

        //check alert to confirm successful 
        await page.waitForSelector("#manage-deploy-alert-header");
        text = await page.$eval("#manage-deploy-alert-header", element => element.innerText);
        expect(text).toBe('Project has been deployed!');

        //check alert to confirm successful 
        await page.waitForSelector("#manage-deploy-alert-message");
        text = await page.$eval("#manage-deploy-alert-message", element => element.innerText);
        expect(text).toBe('Hosting URL: ' + process.env.project_url);
    },

}