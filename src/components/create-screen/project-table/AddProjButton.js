/* Defines button component for adding a new project to firelounge */

import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {UserDispatch} from "../../../context/userContext";
import {Alert} from "react-context-alerts";


export default function AddProjButton(props) {
    const {ipcRenderer} = window.require('electron');
    const dispatch = UserDispatch();
    const [error, setError]  = React.useState({display: false, message: ''});

    /* Send IPC to retrieve the selected filepath */
    const getPathIPC = () =>{
        ipcRenderer.send("get-path", 'init-path');

        ipcRenderer.once("get-path-reply", (event, response) => {
            if( (response.split(' ', 1)[0]) === 'Error:'){
                //display error message if incorrect file selected
                setError({display: true, message: response})
            } else if (response !== 'Cancelled') {
                try {
                    let new_proj = JSON.parse(JSON.stringify(props.cur_proj));
                    new_proj.path = response;
                    dispatch({type:"addProj", args: new_proj});
                } catch (error) {
                    setError({display: true, message: error})
                }
            }
        });
    };

    return (
        <div>
            <IconButton aria-label="Add" onClick={getPathIPC}>
                <AddCircleIcon style={{color: 'white'}}/>
            </IconButton>
            <Alert type={'error'} open={error.display} message={error.message} onClose={()=>{ setError({display:false, message:''}) } }/>
        </div>
    );
}

