import React from 'react'
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SwitchesGroup from './SwitchesGroup.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import { makeStyles } from '@material-ui/core/styles'
import {UserState} from "../../../context/userContext";

const useStyles = makeStyles((theme) => ({
    root: {
        left: '0px',
        right: '0px',
        height: '100%'
    },
    card: {
        height: '100%',
        borderRadius: 45,
    },
    heading: {
        paddingLeft: '3%',
        paddingTop: '3%',
        paddingBottom: '2%',
        backgroundColor: '#8D99AE',
        color: 'white',
        fontWeight:200,
    },
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)

    },
    deployText: {
        paddingLeft: '3%',
        paddingTop: '3%',
        fontWeight:200,
    },
    content: {
      height: '71%',
    },
    footer: {
        position: 'relative',
        bottom: 0,
        backgroundColor: '#8D99AE',
        height: '15%',
    },
    divider: {
        marginTop: '3%',
    },
    deployBullet: {
        paddingLeft: '4%',
        paddingTop: '3%',
        fontWeight:200,
        alignItems: 'center'
    },
    bulletIcon: {
        marginRight: '1%',
        color: '#8D99AE',
        verticalAlign: 'middle',
    }
}));

function DeployScreenCard() {
    const classes = useStyles();
    const {user} = UserState();

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading} variant={"h6"}> Deploy your FireLounge project </Typography>
                <div className={classes.content}>
                    {user.act_proj.name === '' ? (
                        <div className={classes.noActiveMSG}>
                            <div style={{margin:'5%'}}/>
                            <Typography className={classes.deployText}>
                                You dont have any active projects on FireLounge.
                            </Typography>
                            <div style={{margin:'10%'}}/>
                            <Typography className={classes.deployText}>
                                Head over to the project creation tab to create a new project or initialize a current firebase project through FireLounge
                            </Typography>
                        </div>
                    ): (
                        <div>
                            <Typography className={classes.deployText}>Current Active Project Info</Typography>
                            <Typography variant={'subtitle2'}  className={classes.deployBullet}>
                                <AccountCircleIcon className={classes.bulletIcon}/>
                                {user.uname}
                            </Typography>
                            <Typography variant={'subtitle2'} className={classes.deployBullet}>
                                <FolderSpecialIcon className={classes.bulletIcon}/>
                                {user.act_proj.name}
                            </Typography>
                            <Divider className={classes.divider}/>
                            <Typography className={classes.deployText}> Select Features to Deploy</Typography>
                            <SwitchesGroup className={classes.switchesGroup}/>
                        </div>
                    )}
                </div>
                <div className={classes.footer}/>
            </Card>
        </div>
    )
}

export default DeployScreenCard;




