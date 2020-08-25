import React from 'react'
import {Card, makeStyles, Typography, Divider} from "@material-ui/core";
import DbObjectDisplay from './DbObjectDisplay.js'
import {UserState} from "../../../context/userContext";
import NoActiveDb from '../../Utility/NoActiveDb'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    card: {
        height: '100%',
        borderRadius: '25px',
        overflowY: 'auto'
    },
    heading: {
        marginTop: '3%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:200,
    },
    divider: {
        marginTop: '1%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    ObjectContainer: {
        width: '90%',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

export default function DbObjectScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
            <Typography className={classes.heading} variant={"h6"}> Edit Database </Typography>
            <Divider className={classes.divider}/>
            {user.act_db_name !== '' ? (
                    <div className={classes.ObjectContainer}>
                        <DbObjectDisplay/>
                    </div>
                ): (
                    <NoActiveDb/>
                )}

            </Card>
        </div>
    )
}