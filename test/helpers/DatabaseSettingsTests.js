/* Checks to confirm database settings functions correctly */ 
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
    
}
