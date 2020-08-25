import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import SettingsSwitchesGroup from './SettingsSwitchesGroup';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {UserState} from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        height: 'calc(100% - 48px)',
        width: '95%',
        borderRadius: '5px',
        overflow: 'hidden',
        backgroundColor: '#EDF2F4',
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


/** 
 * Card for holding the DB settings Switches Group
 * Appears as a Tab in the Settings Modal
 * 
 * @props close: setState function which toggles the SettingsModal display true/false
 * 
*/ 


export default function DbSettingsCard(props) {
    const classes = useStyles();
    const { user } = UserState();

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Database Settings </ Typography>
                <Divider className={classes.divider}/>
                {user.act_db_name !== '' ? (
                    <SettingsSwitchesGroup close={props.close}/>
                ): (
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
                )}
                
            </Card>
        </div>
    )
}