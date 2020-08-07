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
        height: '100%',
        width: '100%'
    },
    card: {
        height: '100%',
        width: '100%',
        borderRadius: '25px',
    },
    heading: {
        marginTop: '3%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:200,
    },
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)

    },
    deployText: {
        fontWeight:200,
        marginRight: '5%'
    },
    bodyNoActiveProject: {
        display: 'inlineBlock',
        height: '69%',
    },
    body: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    divider: {
        marginTop: '1%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    dividerBody: {
        marginTop: '2%',
        marginBottom: '3%',
    },
    deployBullet: {
        fontWeight:200,
        alignItems: 'center',
        display: 'flex',
        width: '30%'
    },
    bulletIcon: {
        marginRight: '1%',
        color: '#8D99AE',
        verticalAlign: 'middle',
    },
    activeProj: {
        display:'flex',
        marginTop: '3%'
    }
}));

function DeployScreenCard() {
    const classes = useStyles();
    const {user} = UserState();

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading} variant={"h6"}> Deploy Project </Typography>
                <Divider className={classes.divider}/>
                <div className={classes.bodyNoActiveProject}>
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
                        <div className={classes.body}>
                            <div className={classes.activeProj}>
                            <Typography className={classes.deployText}>Active Project:</Typography>
                            <Typography variant={'subtitle2'}  className={classes.deployBullet}>
                                <AccountCircleIcon className={classes.bulletIcon}/>
                                {user.uname}
                            </Typography>
                            <Typography variant={'subtitle2'} className={classes.deployBullet}>
                                <FolderSpecialIcon className={classes.bulletIcon}/>
                                {user.act_proj.name}
                            </Typography>
                            </div>
                            <Divider className={classes.dividerBody}/>
                            <Typography className={classes.deployText}> Deploy Features:</Typography>
                            <SwitchesGroup className={classes.switchesGroup}/>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}

export default DeployScreenCard;




