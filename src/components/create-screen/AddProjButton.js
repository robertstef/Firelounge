/* Defines button component for adding a new project to firelounge */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {UserDispatch} from "../../context/userContext";
import {Alert} from "react-context-alerts";


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
    const [showAlert, setAlert] = React.useState({display: false, status: '', data: ''});
    const getPathIPC = () =>{
        ipcRenderer.send("get-path", 'init-path');

        ipcRenderer.once("get-path-reply", (event, response) => {
            if(response.substring(0,5) === "Error" ){
                // TODO render AddProjAlert when invalid path entered
                let results = {
                    display: true,
                    status: "error",
                    data: response

                };
                setAlert(prevState => results)
            } else {
                let results = {
                    display: true,
                    status: "success",
                    data: response

                };
                setAlert(prevState => results);
                let new_proj = JSON.parse(JSON.stringify(props.cur_proj));
                new_proj.path = response;
                dispatch({type:"addProj", args: new_proj});
            }
        });
    };

    return (
        <div className={classes.root}>
            <IconButton aria-label="Add" onClick={getPathIPC}>
                <AddCircleIcon style={{color: 'white'}}/>
            </IconButton>
            {showAlert.status === 'success' ? (
                <Alert open={showAlert.display} type={'success'} timeout={5000} message={showAlert.data} header={"Project was added to FireLounge!"} />
            ) : (
                <Alert open={showAlert.display} type={"error"} timeout={5000} message={showAlert.data} header={"Project could not be added!"} />
            )}
        </div>
    );
}

