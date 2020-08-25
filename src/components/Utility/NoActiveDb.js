import React from 'react'
import {Typography, makeStyles} from "@material-ui/core";
import {UserState} from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)
    },
    dbText: {
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
    const { user } = UserState();

    return(
        <div className={classes.root}>
            <div className={classes.noActiveMSG}>
                <div style={{margin:'5%'}}/>
                <Typography className={classes.dbText}>
                    You dont have any active databases setup on FireLounge.
                </Typography>
                <div style={{margin:'10%'}}/>
                <Typography className={classes.dbText}>
                    Click the button in the top right corner to initialize a database through FireLounge.
                </Typography>
            </div>
        </div>
    )
}