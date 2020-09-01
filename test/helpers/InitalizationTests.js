/* Checks to confirm components are correctly displayed on load */ 
module.exports = {
    /* Correct Landing Page Title */ 
    test1: async function (page) {
        await page.waitFor(20000);
        let text;
        await page.waitForSelector("#create-header");
        text = await page.$eval("#create-header", element => element.innerText);
        expect(text).toBe("Create a new FireLounge project");
    }
}