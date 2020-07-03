/* Defines button component for adding a new project to firelounge */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {UserDispatch} from "../../context/userContext";
import AddProjAlert from "./AddProjAlert";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function AddProjButton(props) {
    const classes = useStyles();
    const {ipcRenderer} = window.require('electron');
    const dispatch = UserDispatch();

    const getPathIPC = () =>{
        ipcRenderer.send("get-path", 'init-path');

        ipcRenderer.on("get-path-reply", (event, response) => {
            if( response === "Invalid" ){
                // TODO render AddProjAlert when invalid path entered
                return (<AddProjAlert/>);
            } else {
                let new_proj = JSON.parse(JSON.stringify(props.cur_proj));
                new_proj.path = response;
                dispatch({type:"addProj", args: new_proj});
            }
        });
    };

    return (
        <div className={classes.root}>
            <IconButton aria-label="Add" onClick={getPathIPC}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
}

