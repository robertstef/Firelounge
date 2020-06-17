import React from 'react'
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import SwitchesGroup from './SwitchesGroup.js';
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
    },
    cardBox: {
        marginLeft:'50px',
        marginTop: '25px',
        width: '175px',
        borderRadius: '5px',
    },
    heading: {
        marginTop: '10px',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 24
    },
    divider: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

function DeployScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Deploy Project </Typography>
                <Divider className={classes.divider}/>
                <SwitchesGroup />
            </Card>
        </div>
    )
}

export default DeployScreenCard;




