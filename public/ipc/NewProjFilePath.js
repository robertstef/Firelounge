const {ipcMain, dialog} = require('electron');
const isDev = require("electron-is-dev");
const new_proj_validDir = require(isDev ? '../scripts/new_projValidDir.js' : '../../build/scripts/new_projValidDir.js');

const log = require('electron-log');
const LOGGING = process.env.LOGGING

/* ****** IPC ********* */
let dialogShown = false; 
ipcMain.on('new-proj-filepath', (event, arg) => {
    if (dialogShown === false) {
        dialog.showOpenDialog(null,{ title: 'Fire Lounge', defaultPath: '/', properties:["openDirectory"] }).then( function(res) {
            if (res.canceled === true ) {
                dialogShown = false;
                event.reply('new-proj-filepath-reply', "Cancelled");
            } else if (res.filePaths.length > 0) {
                dialogShown = false;
                /* Select a file path that doesnt contain firebase files*/
                new_proj_validDir.new_proj_validDir_function(res.filePaths[0]).then((output) => {
                    event.reply('new-proj-filepath-reply', res.filePaths[0]);
                }).catch(err => {
                    if(LOGGING){log.info(err);}
                    event.reply('new-proj-filepath-reply', "Error: " + err);
                });
            }
        });
        dialogShown = true;
    }
});