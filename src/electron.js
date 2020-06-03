const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const path = require('path');
const server = require('./App.js');
const url = require('url');
const isDev = require("electron-is-dev");

let win;


let dialogShown = false; // flag to represent whether the dialog is open or closed
ipcMain.on('get-path', (event, arg) => {
    if (dialogShown === false) {
        dialog.showOpenDialog(null,{ title: 'Fire Lounge', defaultPath: '/', properties:["openDirectory"] }).then( function(res) {
                if (res.canceled === true || res.filePaths.length > 0) {
                    dialogShown = false;
                    //confirm filepath has .firebaserc file
                    const validDir = require('./scripts/validDir.js');
                    validDir.validDir_function(res.filePaths[0]).then((output) => {
                        //if valid - send back path
                        if( output === 1 ) {
                            event.reply('get-path-reply', res.filePaths[0]);
                            ipcMain.removeAllListeners('get-path-reply')
                        } else {
                            //else invalid - send back invalid
                            event.reply('get-path-reply', "Invalid Path");
                            ipcMain.removeAllListeners('get-path-reply')
                        }
                    }) ;
                }
            }
        );
        dialogShown = true;
    }
});

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
        },
        width: 1000,
        height: 600

    });

    //path needs to be changed -- remove __dirname and use something else [ process.cwd() ] ? 
    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../../../../../../../build/index.html")}`);

    //if dev mode then open with dev tools
    if(isDev){
        win.webContents.openDevTools();
    }
    
    win.on('closed', function (){
        win = null;
    });
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
});



