import React from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles'
<<<<<<< HEAD:src/components/manage-screen/db-screen/DbScreenCard.js
import executeQuery from '../../../db-queries/execute';
import {UserState} from '../../../context/userContext';
=======
import {UserState} from "../../../context/userContext";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
>>>>>>> b2f908a2777ced47256ae16f6c5d1844d37f784f:src/components/manage-screen/db-query-screen/DbQueryScreenCard.js

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

//adding padding to the textfield causes the whole div to overflow the card
//need to put it in another div or pass down props to label etc. 
export default function DbQueryScreenCard() {
    const classes = useStyles();
<<<<<<< HEAD:src/components/manage-screen/db-screen/DbScreenCard.js
    const {user} = UserState();

    async function sql_query(query) {

        const result = await executeQuery(query, user);
        console.log(result);
    }

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <TextField
                    id="standard-textarea"
                    label="Query"
                    multiline
                    defaultValue="Default Value"
                    className={classes.textField}
                    onKeyPress={ (press) => {
                        if (press.key === 'Enter') {
                            console.log(press.target.value);
                            sql_query(press.target.value);
                        }
                    }}
                />
                <DbObjectDisplay/>
=======
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

>>>>>>> b2f908a2777ced47256ae16f6c5d1844d37f784f:src/components/manage-screen/db-query-screen/DbQueryScreenCard.js
            </Card>
        </div>
    )
}

/*Sampe usge of ReactJson View */
// <ReactJson
//                     name={false}
//                     collapsed={collapsed}
//                     style={style}
//                     theme={theme}
//                     src={src}
//                     collapseStringsAfterLength={collapseStringsAfter}
//                     onEdit={
//                         onEdit
//                             ? e => {
//                                   console.log(e)
//                                   this.setState({ src: e.updated_src })
//                               }
//                             : false
//                     }
//                     onDelete={
//                         onDelete
//                             ? e => {
//                                   console.log(e)
//                                   this.setState({ src: e.updated_src })
//                               }
//                             : false
//                     }
//                     onAdd={
//                         onAdd
//                             ? e => {
//                                   console.log(e)
//                                   this.setState({ src: e.updated_src })
//                               }
//                             : false
//                     }
//                     displayObjectSize={displayObjectSize}
//                     enableClipboard={enableClipboard}
//                     indentWidth={indentWidth}
//                     displayDataTypes={displayDataTypes}
//                     iconStyle={iconStyle}
//                 />
