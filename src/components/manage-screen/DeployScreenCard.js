import React from 'react'
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import SwitchesGroup from './SwitchesGroup.js';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%'
    },
    card: {
        height: '87vh',
        width: '100%',
        borderRadius: '5px',
    },
    cardBox: {
        marginLeft:'50px',
        marginTop: '25px',
        width: '175px',
        borderRadius: '5px',
    },
    heading: {
        textAlign: 'center',
        verticalAlign: 'center'
    }
}));

function DeployScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Box boxShadow={2} className={classes.cardBox}>
                    <h2 className={classes.heading}> Deploy Page </h2>
                </Box>
                <SwitchesGroup />
            </Card>
        </div>
    )
}

export default DeployScreenCard;




