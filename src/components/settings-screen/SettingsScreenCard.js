import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%'
    },
    card: {
        height: '83vh',
        width: '100%',
        borderRadius: '5px',
        marginTop: -25,
        marginLeft: -3,
        overflow: 'hidden'
    },
}));



export default function SettingsScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
            </Card>
        </div>
    )
}