import React from "react";
import Button from "@material-ui/core/Button";
import { Alert } from 'react-context-alerts';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
   btn: {
       height:'40px',
       backgroundColor: '#fff',
       fontWeight:200,
       borderRadius: 12,
       "&:hover":{
           borderRadius: 12,
           background: '#d5d5d5',
       },
       paddingLeft: 12,
       paddingRight: 12
   },
}));
export default function GetPathButton(props) {
    const {ipcRenderer} = window.require('electron');
    const classes = useStyles();
    const [filePath, setFilePath ] = React.useState('');
    const [error, setError]  = React.useState({display: false, message: ''});

    /* Displays the filepath in the React button */
    var DisplayFilePath = () => {
        if (filePath === ''){
            return 'Select File Path...'
        } else {
            return filePath;
        }
    };
    /* Send IPC to retrieve the selected filepath */
    const getPathIPC = () =>{
        ipcRenderer.send("new-proj-filepath");
        ipcRenderer.once("new-proj-filepath-reply", (event, arg) => {
            if( (arg.split(' ', 1)[0]) === 'Error:'){
                //display error message
                setError({display: true, message: arg})
            } else if (arg !== 'Cancelled') {
                //updates the display of the file path
                setFilePath(arg);
                //updates the state of the stepper
                props.path(arg)
            }
        });
    };

    return(
        <div style={{marginTop:10}}>
            <Button size={'small'} className={classes.btn} onClick={getPathIPC} >
                <DisplayFilePath />
            </Button>
            <Alert type={'error'} open={error.display} message={error.message} onClose={()=>{ setError({display:false, message:''}) } }/>
        </div>
    )
}
