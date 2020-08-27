import React from 'react'
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '3%',
        spacing: theme.spacing(2)
    },
    text: {
        paddingLeft: '3%',
        paddingTop: '3%',
        fontWeight:200,
    },
}));


/** 
 * Displays message when no active database defined
 * 
*/ 
export default function NoActiveDb() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <div style={{margin:'5%'}}/>
            <Typography className={classes.text}>
                You dont have any active databases setup on FireLounge.
            </Typography>
            <div style={{margin:'10%'}}/>
            <Typography className={classes.text}>
                Click the button in the top right corner to initialize a database through FireLounge.
            </Typography>
        </div>
    )
}