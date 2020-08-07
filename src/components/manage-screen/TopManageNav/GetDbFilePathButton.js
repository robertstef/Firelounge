import React from "react";
import Button from "@material-ui/core/Button";
import {UserState} from '../../../context/userContext'
import { Alert } from 'react-context-alerts';

/*
Gets the selected file path of the firebase admin private key
Props:
    path = callback function to retreive the path name
*/
export default function GetPathButton(props) {
    const {ipcRenderer} = window.require('electron');
    const {user} = UserState();
    const [filePath, setFilePath ] = React.useState('');
    const [error, setError]  = React.useState({display: false, message: ''});
    
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
        ipcRenderer.send("get-db-path", user.act_proj.id);

        ipcRenderer.once("get-db-path-reply", (event, arg) => {
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
