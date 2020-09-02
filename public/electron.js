const { app, BrowserWindow, ipcMain, dialog, nativeImage} = require('electron');
const path = require('path');
const url = require('url');
const isDev = require("electron-is-dev");

/* Set ICP channels for filepath selection */
require('./ipc/NewProjFilePath.js')
require('./ipc/DatabaseFilePath.js')
require('./ipc/ExistingProjFilePath.js')

// Set error logging
process.env.LOGGING = false;

let win;
function createWindow () {
    win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true    
        },
        //sets icon for windows/linux 
        icon: isDev ? app.getAppPath() + "/public/icon.png" : `${path.join(__dirname, "../build/icon.png")}`
    });

    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`);

    if(isDev && !process.env.hide_webtools){
        win.webContents.openDevTools();
    }

    win.on('closed', function (){
        win = null;
    });
}

app.whenReady().then(createWindow);

// this sets icon for MacOS
const image = nativeImage.createFromPath(
    isDev ? app.getAppPath() + "/public/icon.png" : `${path.join(__dirname, "../build/icon.png")}`
  );
app.dock.setIcon(image);


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})