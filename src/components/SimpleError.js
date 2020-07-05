import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '75%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: '10px',
    left: 'auto',
    right: 'auto'
  },
}));

/*
Sample Usage
* Define State
    const [isError, setIsError ] = React.useState({isOpen: undefined ? isError : false, message: ''});

* Set State when error occurs
    setIsError({isOpen: true, message: arg})

* Returned component
    <SimpleError message={isError.message} isOpen={isError.isOpen} setIsOpen={setIsError}/>
*/
export default function SimpleAlerts(props) {
    const classes = useStyles();
    
    return (
            <div className={classes.root}>
            <Collapse in={props.isOpen} >
                <Alert
                severity="error"
                variant="filled"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                {props.message}
                </Alert>
            </Collapse>
        </div>
    );
}
