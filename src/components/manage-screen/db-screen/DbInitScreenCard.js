import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GetFilePath from './GetDbFilePathButton'

const useStyles = makeStyles((theme) => ({
    root: {
        left: '0px',
        right: '0px',
        height: '100%',
    },
    card: {
        height: '100%',
    },
    textField: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    heading: {
        marginTop: '10px',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    divider: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

export default function DbInitScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Initialize Database </ Typography>
                <Divider className={classes.divider}/>
                <GetFilePath/>
            </Card>
        </div>
    )
}