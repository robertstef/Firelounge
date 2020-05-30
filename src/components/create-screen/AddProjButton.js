/* Defines button component for adding a new project to firelounge */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function AddProjButton() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <IconButton aria-label="Add">
                <AddCircleIcon />
            </IconButton>
        </div>
    );
}

