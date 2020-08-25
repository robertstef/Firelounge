import React from 'react'
import {Card, Divider, Typography, makeStyles} from "@material-ui/core/";
import SwitchesGroup from './SwitchesGroup.js';
import {AccountCircle, FolderSpecial} from '@material-ui/icons';
import {UserState} from "../../../context/userContext";
import NoActiveProj from "../../Utility/NoActiveProj"

const useStyles = makeStyles((theme) => ({
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
    subheading: {
        marginRight: '3%',
        fontWeight:200,
    },
    body: {
        height: '69%',
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
    bodyDivider: {
        marginTop: '1%',
        marginBottom: '3%',
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    infoHeading: {
        fontWeight:200,
        alignItems: 'center',
        display: 'flex',
        width: '30%'
    },
    infoIcon: {
        marginRight: '1%',
        color: '#8D99AE',
        verticalAlign: 'middle',
    },
    projInfo: {
        display:'flex',
        marginTop: '3%'
    },

}));

function DeployScreenCard() {
    const classes = useStyles();
    const {user} = UserState();

    return(
        <Card className={classes.card}>
            <Typography className={classes.heading} variant={"h6"}> Deploy Project </Typography>
            <Divider className={classes.divider}/>
                {user.act_proj.name === '' ? (
                    <NoActiveProj/>
                ): (
                    <div className={classes.body}>
                        <div className={classes.projInfo}>
                            <Typography className={classes.subheading}>Active Project:</Typography>
                            <Typography id={'manage-deploy-proj-uname'} variant={'subtitle2'}  className={classes.infoHeading}>
                                <AccountCircle className={classes.infoIcon}/>
                                {user.uname}
                            </Typography>
                            <Typography id={'manage-deploy-proj-title'} variant={'subtitle2'} className={classes.infoHeading}>
                                <FolderSpecial className={classes.infoIcon}/>
                                {user.act_proj.name}
                            </Typography>
                        </div>
                            <Divider className={classes.bodyDivider}/>
                            <Typography className={classes.subheading}> Deploy Features:</Typography>
                            <SwitchesGroup className={classes.switchesGroup}/>
                    </div>
                )}
        </Card>
    )
}

export default DeployScreenCard;




