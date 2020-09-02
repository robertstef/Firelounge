const {ipcMain, dialog} = require('electron');
const isDev = require("electron-is-dev");
const validAdminKey = require(isDev ? '../scripts/validAdminKey.js' : '../../build/scripts/validAdminKey');

const log = require('electron-log');
const LOGGING = process.env.LOGGING

/* ****** IPC for selecting file path to db admin key ********* */
let dbDialogShown = false; 
ipcMain.on('get-db-path', (event, arg) => {
    if (dbDialogShown === false) {
        dialog.showOpenDialog(null,{ title: 'Fire Lounge', defaultPath: '/', properties:["openFile"] }).then( function(res) {
                if (res.canceled === true) {
                    dbDialogShown = false;
                    event.reply('get-db-path-reply', "Invalid");
                } else if(res.filePaths.length > 0) {
                    dbDialogShown = false;
                    validAdminKey.validAdminKey_function(res.filePaths[0], arg).then((output) => {
                        event.reply('get-db-path-reply', res.filePaths[0]);
                    }).catch(err => {
                        if(LOGGING){log.info(err);}
                        //else invalid - send back invalid
                        event.reply('get-db-path-reply', "Error: " + err);
                    });
                }
            }
        );
        dbDialogShown = true;
    }
});