import React from "react";
import Button from "@material-ui/core/Button";
import { Alert } from 'react-context-alerts';

export default function GetPathButton(props) {
    const {ipcRenderer} = window.require('electron');
    
    const [filePath, setFilePath ] = React.useState('');
    const [error, setError]  = React.useState({display: false, message: ''});
    
    /* Displays the filepath in the React button */
    var DisplayFilePath = () => {
        if (filePath === ''){
            return 'Select File Path...'
        } else{
            return filePath;
        }
    };
    /* Send IPC to retrieve the selected filepath */
    const getPathIPC = () =>{
        ipcRenderer.send("get-path", 'init-path');

        ipcRenderer.once("get-path-reply", (event, arg) => {
            if( (arg.split(' ', 1)[0]) === 'Error:'){
                //display error message
                setError({display: true, message: arg})
            } else if (arg !== 'Invalid') {
                //updates the display of the file path
                setFilePath(arg);
                //updates the state of the stepper
                props.path(arg)
            }
        });
    };

    return(
        <div style={{marginTop:10}}>
            <Button size={'small'} variant={'outlined'} style={{height:'40px'}} onClick={getPathIPC} >
                <DisplayFilePath />
            </Button>
            <Alert type={'error'} open={error.display} message={error.message} onClose={()=>{ setError({display:false, message:''}) } }/>
        </div>
    )
}
