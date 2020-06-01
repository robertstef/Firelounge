import React from "react";
import Button from "@material-ui/core/Button";


export default function GetPathButton() {
    const getPathIPC = () =>{
        const {ipcRenderer} = window.require('electron');
        ipcRenderer.send("get-path", null);
        ipcRenderer.on("get-path-reply", (event, arg) => {
            console.log("Got the path", arg)
        })

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
