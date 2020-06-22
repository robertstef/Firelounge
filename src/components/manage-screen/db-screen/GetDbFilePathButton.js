import React from "react";
import Button from "@material-ui/core/Button";


export default function GetPathButton(props) {
    const {ipcRenderer} = window.require('electron');
    
    const [filePath, setFilePath ] = React.useState('');

    /* Displays the filepath in the React button */
    var DisplayFilePath = () => {
        if (filePath === ''){
            return 'Select File Path...'
        } else{
            return filePath;
        }
    }
    /* Send IPC to retrieve the selected filepath */
    const getPathIPC = () =>{
        ipcRenderer.send("get-db-path", null);

        ipcRenderer.on("get-db-path-reply", (event, arg) => {
            if(arg === 'Invalid'){
                //need to add in some error feedback here
                console.log('Invalid file path')
            } else {
                //received valid path
                setFilePath(arg);
                props.path(arg)
                //send file path up to CreateCurrentProjectContent via callback function
                
            }
        });
    };

    return(
        <div style={{marginTop:10}}>
            <Button size={'small'} variant={'outlined'} style={{height:'40px'}} onClick={getPathIPC} >
                <DisplayFilePath />
            </Button>
        </div>
    )
}