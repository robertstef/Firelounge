import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from '@material-ui/core/Chip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
    },
    button: {
        position: 'absolute',
        right: '5%',
        bottom: '5%',
        backgroundColor: '#8D99AE'
    },
    chipArray: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
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

    
    let loung_projs = []
    if(user.projs !== undefined && user.projs !== null ) {
        Object.keys(user.projs).forEach(function(key) {
            loung_projs.push(key)
        });
    }

    let fb_projs = []
    if(user.firebase_projs !== undefined && user.firebase_projs !== null  ) {
        Object.keys(user.firebase_projs).forEach(function(key) {
            fb_projs.push(user.firebase_projs[key].name)
        });
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                
                {/* User Name */}
                <Typography className={classes.heading}> Signed In As: </ Typography>
                <Divider className={classes.divider}/>
                <div className={classes.chipArray}>
                <Chip
                        icon={<AccountCircleIcon />}
                        label={user.uname}
                        className={classes.chip}
                />
                </div>
                
                
                {/* Firelounge projects */}
                <Typography className={classes.heading}> Firelounge Projects: </ Typography>
                <Divider className={classes.divider}/>
                <div className={classes.chipArray}>
                {loung_projs.map((data) => {
                    return (
                    <li key={data}>
                        <Chip
                        label={data}
                        className={classes.chip}
                        />
                    </li>
                    );
                })}
                </div>
                

                {/* FireBase projects */}
                <Typography className={classes.heading}> Remaining Firebase Projects: </ Typography>
                <Divider className={classes.divider}/>
                <div className={classes.chipArray}>
                {fb_projs.map((data) => {
                    return (
                    <li key={data}>
                        <Chip
                        label={data}
                        className={classes.chip}
                        />
                    </li>
                    );
                })}
                </div>


                <Button className={classes.button} color={'default'} onClick={handleClick}> Logout</Button>
            </Card>
        </div>
    )
}