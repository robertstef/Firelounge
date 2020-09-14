const {ipcMain, dialog} = require('electron');
const isDev = require("electron-is-dev");
const validDir = require(isDev ? '../scripts/validDir.js' : '../../build/scripts/validDir.js');

const log = require('electron-log');
const LOGGING = process.env.LOGGING

/* ****** IPC ********* */
let dialogShown = false;
ipcMain.on('existing-proj-filepath', (event, arg) => {
    if (dialogShown === false) {
        dialog.showOpenDialog(null,{ title: 'Fire Lounge', defaultPath: '/', properties:["openDirectory"] }).then( function(res) {
                if (res.canceled === true ) {
                    dialogShown = false;
                    event.reply('existing-proj-filepath-reply', "Cancelled");
                }  else if (res.filePaths.length > 0) {
                    dialogShown = false;
                    /* Select a file path that contains firebase files*/
                    validDir.validDir_function(res.filePaths[0]).then((output) => {
                        event.reply('existing-proj-filepath-reply', res.filePaths[0]);
                    }).catch(err => {
                        if(LOGGING){log.info(err);}
                        //else invalid - send back invalid
                        event.reply('existing-proj-filepath-reply', "Error: " + err);

                    });
                }
            }
        );
        dialogShown = true;
    }
});