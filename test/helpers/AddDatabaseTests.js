/* Tests the additions of a new database to FireLounge */ 
module.exports = {
    /* Confirms Navigation to Database Object Page */ 
    test1: async function (page) {
        await page.waitFor(5000);
        let text;

        await page.waitForSelector("#manage-object-icon");
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
    }
}