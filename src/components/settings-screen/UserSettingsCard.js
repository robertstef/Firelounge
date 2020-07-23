import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {UserDispatch, UserState} from "../../context/userContext";
const logout = require('../../scripts/logout');

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





/*
Card for holding the DB settings Switches Group
Appears as a Tab in the Settings Modal
*/
export default function UserSettingsCard(props) {
    const {user} = UserState();  
    const dispatch = UserDispatch();
    const classes = useStyles();
    
    // console.log(user.firebase_projs)
    // console.log(user.firelounge_projs)

    const handleClick = async () => {
        let response = await logout.logout_function();
        response = response.split(" ");
        response =response[2]
        

        if(response === 'Logged'){
            //set disbatch to blank
            let user = {}
            await dispatch({type: 'createUser', args: user});
            props.close(false)
        } 

    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> User Settings </ Typography>
                <Divider className={classes.divider}/>
                <Typography className={classes.heading}> User: {user.uname} </ Typography>
                
                
                <Button onClick={handleClick}> Logout</Button>
            </Card>
        </div>
    )
}