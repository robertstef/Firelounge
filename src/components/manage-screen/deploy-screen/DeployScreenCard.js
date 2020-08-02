import React from 'react'
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SwitchesGroup from './SwitchesGroup.js';
import { makeStyles } from '@material-ui/core/styles'
import {UserState} from "../../../context/userContext";

const useStyles = makeStyles((theme) => ({
    root: {
        left: '0px',
        right: '0px',
        height: '100%'
    },
    card: {
        height: '100%'
    },
    heading: {
        marginTop: '10px',
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24
    },
    divider: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)

    },
}));

function DeployScreenCard() {
    const classes = useStyles();
    const {user} = UserState();

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Deploy Project </Typography>
                {user.act_proj.name === '' ? (
                    <div className={classes.noActiveMSG}>
                        <Divider/>
                        <div style={{margin:'5%'}}/>
                        <Typography>
                            You dont have any active projects on FireLounge.
                        </Typography>
                        <div style={{margin:'10%'}}/>
                        <Typography>
                            Head over to the project creation tab to create a new project or initialize a current firebase project through FireLounge
                        </Typography>
                    </div>
                ): (
                    <div>
                        <Divider className={classes.divider}/>
                        <SwitchesGroup className={classes.switchesGroup}/>
                    </div>
                )}

            </Card>
        </div>
    )
}

export default DeployScreenCard;




