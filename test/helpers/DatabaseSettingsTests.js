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
        //click settings button
        await page.waitForSelector("#settings-database-icon");
        await page.hover("#settings-database-icon");
        await page.click("#settings-database-icon");

        //check database settings header value
        await page.waitForSelector("#settings-database-header");
        text = await page.$eval("#settings-database-header", element => element.innerText);
        expect(text).toBe('Database Settings')
        
        await page.waitForSelector("#settings-database-switch-edit");
        text = await page.$eval("#settings-database-switch-edit", element => element.checked);
        expect(text).toBe(true)

        await page.waitForSelector("#settings-database-switch-add");
        text = await page.$eval("#settings-database-switch-add", element => element.checked);
        expect(text).toBe(false)

        await page.waitForSelector("#settings-database-switch-delete");
        text = await page.$eval("#settings-database-switch-delete", element => element.checked);
        expect(text).toBe(false)

        await page.waitForSelector("#settings-database-switch-collapsed");
        text = await page.$eval("#settings-database-switch-collapsed", element => element.checked);
        expect(text).toBe(true)

        await page.waitForSelector("#settings-database-switch-clipboard");
        text = await page.$eval("#settings-database-switch-clipboard", element => element.checked);
        expect(text).toBe(true)

        await page.waitForSelector("#settings-database-switch-displayObjectSize");
        text = await page.$eval("#settings-database-switch-displayObjectSize", element => element.checked);
        expect(text).toBe(false)

        await page.waitForSelector("#settings-database-switch-displayDataType");
        text = await page.$eval("#settings-database-switch-displayDataType", element => element.checked);
        expect(text).toBe(false)

        await page.waitForSelector("#settings-database-switch-sortKeys");
        text = await page.$eval("#settings-database-switch-sortKeys", element => element.checked);
        expect(text).toBe(false)

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

        //Gets access to react-json-view props to check settings
        let props = await page.evaluate(() => {
            let elements = document.getElementsByClassName('react-json-view');
            let handler_values = Object.values(elements[0])[1]
            let props = handler_values.children[1].props
            return props
        });

        //Default Database Settings Add: false, Edit: true, Delete: false, Collapsed: true, DisplayObjectSize: false, SortKeys: false, DisplayDataType: false, Clipboard: true
        expect(props.sortKeys).toBe(false)
        expect(props.enableClipboard).toBe(true)
        expect(props.displayDataTypes).toBe(false)
        expect(props.displayObjectSize).toBe(false)
        expect(props.collapsed).toBe(true)
        expect(props.onAdd).toBe(false)
        expect(typeof(props.onEdit)).toBe('object')
        expect(props.onDelete).toBe(false)
    },


    /* Update Database Settings */ 
    test4: async function (page) {
        await page.waitFor(1000);
        
        //open settings modal
        await page.waitForSelector("#settings-modal-button");
        await page.hover("#settings-modal-button");
        await page.click("#settings-modal-button");

        //confirm username
        await page.waitForSelector("#settings-modal-user-username");
        text = await page.$eval("#settings-modal-user-username", element => element.innerText);
        expect(text).toBe(process.env.username)

        //click settings button
         await page.waitForSelector("#settings-database-icon");
         await page.hover("#settings-database-icon");
         await page.click("#settings-database-icon");
        
         //check database settings header value
         await page.waitForSelector("#settings-database-header");
         text = await page.$eval("#settings-database-header", element => element.innerText);
         expect(text).toBe('Database Settings')
         
         await page.waitForSelector("#settings-database-switch-edit");
         await page.hover("#settings-database-switch-edit");
         await page.click("#settings-database-switch-edit");
         text = await page.$eval("#settings-database-switch-edit", element => element.checked);
         expect(text).toBe(false)
 
         await page.waitForSelector("#settings-database-switch-add");
         await page.hover("#settings-database-switch-add");
         await page.click("#settings-database-switch-add");
         text = await page.$eval("#settings-database-switch-add", element => element.checked);
         expect(text).toBe(true)
 
         await page.waitForSelector("#settings-database-switch-delete");
         await page.hover("#settings-database-switch-delete");
         await page.click("#settings-database-switch-delete");
         text = await page.$eval("#settings-database-switch-delete", element => element.checked);
         expect(text).toBe(true)
 
         await page.waitForSelector("#settings-database-switch-collapsed");
         await page.hover("#settings-database-switch-collapsed");
         await page.click("#settings-database-switch-collapsed");
         text = await page.$eval("#settings-database-switch-collapsed", element => element.checked);
         expect(text).toBe(false)
 
         await page.waitForSelector("#settings-database-switch-clipboard");
         await page.hover("#settings-database-switch-clipboard");
         await page.click("#settings-database-switch-clipboard");
         text = await page.$eval("#settings-database-switch-clipboard", element => element.checked);
         expect(text).toBe(false)
 
         await page.waitForSelector("#settings-database-switch-displayObjectSize");
         await page.hover("#settings-database-switch-displayObjectSize");
         await page.click("#settings-database-switch-displayObjectSize");
         text = await page.$eval("#settings-database-switch-displayObjectSize", element => element.checked);
         expect(text).toBe(true)
 
         await page.waitForSelector("#settings-database-switch-displayDataType");
         await page.hover("#settings-database-switch-displayDataType");
         await page.click("#settings-database-switch-displayDataType");
         text = await page.$eval("#settings-database-switch-displayDataType", element => element.checked);
         expect(text).toBe(true)
 
         await page.waitForSelector("#settings-database-switch-sortKeys");
         await page.hover("#settings-database-switch-sortKeys");
         await page.click("#settings-database-switch-sortKeys");
         text = await page.$eval("#settings-database-switch-sortKeys", element => element.checked);
         expect(text).toBe(true)


         //save settings
         await page.waitForSelector("#settings-database-save-button");
         await page.hover("#settings-database-save-button");
         await page.click("#settings-database-save-button");

    },

    /* Confirm Database Settings Being Updated Correctly */ 
    test5: async function (page) {
        await page.waitFor(1000);
    
        //click create button
        await page.waitForSelector("#create-proj-icon");
        await page.hover("#create-proj-icon");
        await page.click("#create-proj-icon");

        //click manage button
        await page.waitForSelector("#manage-proj-icon");
        await page.hover("#manage-proj-icon");
        await page.click("#manage-proj-icon");

        //click edit database button
        await page.waitForSelector("#manage-object-icon");
        await page.hover("#manage-object-icon");
        await page.click("#manage-object-icon");

        //confirm manage icon header
        await page.waitForSelector("#manage-object-header");
        text = await page.$eval("#manage-object-header", element => element.innerText);
        expect(text).toBe('Edit Database')

        //wait for db to load (no longer collapsed)
        await page.waitFor(3000);

        //Gets access to react-json-view props to check settings
        let props = await page.evaluate(() => {
            let elements = document.getElementsByClassName('react-json-view');
            let handler_values = Object.values(elements[0])[1]
            let props = handler_values.children[1].props
            return props
        });

        expect(props.sortKeys).toBe(true)
        expect(props.enableClipboard).toBe(false)
        expect(props.displayDataTypes).toBe(true)
        expect(props.displayObjectSize).toBe(true)
        expect(props.collapsed).toBe(false)
        expect(typeof(props.onAdd)).toBe('object')
        expect(props.onEdit).toBe(false)
        expect(typeof(props.onDelete)).toBe('object')
    },



}
