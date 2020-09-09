const { element } = require("prop-types");

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

    /* Confirm Default Database Settings */ 
    test2: async function (page) {
        
    },

    /* Confirm Database Object Params */ 
    test3: async function (page) {
        
        await page.waitFor(1000);

        //close modal
        await page.waitForSelector("#manage-proj-icon");
        await page.hover("#manage-proj-icon");
        await page.click("#manage-proj-icon");

        //click manage icon
        await page.waitForSelector("#manage-proj-icon");
        await page.hover("#manage-proj-icon");
        await page.click("#manage-proj-icon");

        //click manage object icon
        await page.waitForSelector("#manage-object-icon");
        await page.hover("#manage-object-icon");
        await page.click("#manage-object-icon");

        //confirm manage icon header
        await page.waitForSelector("#manage-object-header");
        text = await page.$eval("#manage-object-header", element => element.innerText);
        expect(text).toBe('Edit Database')


        //sets id of the db object
        await page.evaluate(() => {
            let elements = document.getElementsByClassName('react-json-view');
            let obj_values = Object.values(elements[0])[1]
            let props = obj_values.children[1].props
            console.log(obj_values.children)
            console.log(props)
            console.log(props.sortKeys)


        });

        // await page.waitForSelector("#manage-object-object");

        // let obj = await page.$$eval("#manage-object-object", element => {return element});
        // console.log(obj)

        // let result = await page.$eval("#manage-object-object", element => {
        //     let key = Object.keys(element)[1];
        //     return key
        // })
        // console.log(result)

        // obj = await page.evaluate("#manage-object-object", element => {
        //     return element
        // })
        // console.log(obj)
        await page.waitFor(100000);

    },



    //close modal, check object params (hopefully)

    //change settings 

    //check object again



}
