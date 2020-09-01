/* Tests the additions of a new database to FireLounge */ 
module.exports = {
    /* Confirms Navigation to Database Object Page */ 
    test1: async function (page) {
        await page.waitFor(5000);
        let text;

        await page.waitForSelector("#manage-object-icon");
        await page.hover("#manage-object-icon");
        await page.click("#manage-object-icon");

        // confirm header is displayed
        await page.waitForSelector("#manage-object-header");
        text = await page.$eval("#manage-object-header", element => element.innerText);
        expect(text).toBe('Edit Database');
    },

    /* Open Add Database Modal */ 
    test2: async function (page) {
        let text;

        await page.waitFor(1000);

        await page.waitForSelector("#manage-add-db-icon");
        await page.hover("#manage-add-db-icon");
        await page.click("#manage-add-db-icon");

        await page.waitFor(1000);

        // confirm header is displayed
        await page.waitForSelector("#manage-add-db-header");
        text = await page.$eval("#manage-add-db-header", element => element.innerText);
        expect(text).toBe('Initialize Database');
    },

     /* Input Database Information in Stepper */ 
     test3: async function (page) {
        let text;

        //click next
        await page.waitForSelector("#manage-db-stepper-next-button");
        await page.click("#manage-db-stepper-next-button");

        await page.waitFor(1000);

        // click to select file path 
        await page.waitForSelector("#manage-db-stepper-file-button");
        await page.$eval( "#manage-db-stepper-file-button", form => form.click() );

        await page.waitFor(1000);

        //click next again
        await page.waitForSelector("#manage-db-stepper-next-button:not([disabled]");
        await page.click("#manage-db-stepper-next-button");

        await page.waitFor(1000);

        // file input of db name
        await page.waitForSelector("#manage-db-stepper-input-name");
        await page.type('#manage-db-stepper-input-name', 'Auto Database Name');

        //click next again
        await page.waitForSelector("#manage-db-stepper-next-button:not([disabled]");
        await page.click("#manage-db-stepper-next-button");

        //confirm with alert 
        await page.waitForSelector("#manage-add-db-alert");
        text = await page.$eval("#manage-add-db-alert", element => element.innerText);
        expect(text).toBe('Database successfully added to Firelounge');
    },

    /* Confirm Database was added*/ 
    test4: async function (page) {
        let text;

        // confirm header is displayed
        await page.waitForSelector("#manage-db-list");
        text = await page.$eval("#manage-db-list", element => element.value);
        expect(text).toBe('Auto Database Name');
    },
}