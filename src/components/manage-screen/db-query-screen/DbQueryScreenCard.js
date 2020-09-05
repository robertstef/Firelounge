import React from 'react'
import { makeStyles, Typography, Divider,TextField,Card } from '@material-ui/core'
import {UserState} from "../../../context/userContext";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    card: {
        height: '100%',
        borderRadius: '25px',
    },
    heading: {
        marginTop: '3%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight:200,
    },
    divider: {
        marginTop: '1%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    textField: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '3%'
    },
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)

    },
    dbText: {
        paddingLeft: '3%',
        paddingTop: '3%',
        fontWeight:200,
    },
}));

export default function DbQueryScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading} variant={"h6"}> Query Database </Typography>
                <Divider className={classes.divider}/>
                {user.act_db_name !== '' ? (
                    <div>
                        <TextField
                            id="standard-textarea"
                            label="Query"
                            multiline
                            variant="outlined"
                            
                            className={classes.textField}
                        />
                        
                    </div>
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