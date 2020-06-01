import React from "react";
import Button from "@material-ui/core/Button";
const {ipcRenderer} = window.require('electron');

// we should be able to move this listener to any place in the renderer process and it should receive the path
ipcRenderer.on("get-path-reply", (event, arg) => {
    console.log("Got the path", arg);
});

export default function GetPathButton() {
    const getPathIPC = () =>{
        ipcRenderer.send("get-path", null);
    };

    return(
        <div>
            <Button size={'small'} variant={'outlined'} style={{height:'40px'}} onClick={getPathIPC}
            >
                ...
            </Button>
        </div>
    )

}
