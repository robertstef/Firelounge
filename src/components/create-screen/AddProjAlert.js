import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function AddProjAlert() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Invalid file path, directory must be initialized with both a firebase.json"
                "and .firebaserc file
            </Alert>
        </div>
    )
}