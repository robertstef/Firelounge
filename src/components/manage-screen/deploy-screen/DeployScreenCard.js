import React from 'react'
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SwitchesGroup from './SwitchesGroup.js';
import { makeStyles } from '@material-ui/core/styles'

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
    switchesGroup: {
    }
}));

function DeployScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Deploy Project </Typography>
                <Divider className={classes.divider}/>
                <SwitchesGroup className={classes.switchesGroup}/>
            </Card>
        </div>
    )
}

export default DeployScreenCard;




