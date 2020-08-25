import React from 'react'
import {Typography, makeStyles} from "@material-ui/core";
import {UserState} from "../../context/userContext";

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
export default function NoActiveProj() {
    const classes = useStyles();
    const { user } = UserState();

    return(
        <div className={classes.root}>
            <div style={{margin:'5%'}}/>
            <Typography className={classes.text}>
                You dont have any active projects on FireLounge.
            </Typography>
            <div style={{margin:'10%'}}/>
            <Typography className={classes.text}>
                Head over to the project creation tab to create a new project or initialize a current firebase project through FireLounge
            </Typography>
        </div>
    )
}