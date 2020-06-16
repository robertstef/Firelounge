import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import SettingsSwitchesGroup from './SettingsSwitchesGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        height: '58vh',
        width: '95%',
        margin: '10px',
        borderRadius: '5px',
        overflow: 'hidden',
        backgroundColor: '#EDF2F4',
    },
}));


/*
Card for holding the DB settings Switches Group
Appears as a Tab in the Settings Modal
*/
export default function DbSettingsCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <SettingsSwitchesGroup />
            </Card>
        </div>
    )
}