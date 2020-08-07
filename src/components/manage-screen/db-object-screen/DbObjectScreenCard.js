import React from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
import { makeStyles } from '@material-ui/core/styles'
import {UserState} from "../../../context/userContext";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
    noActiveMSG: {
        padding: '3%',
        spacing: theme.spacing(2)
    },
    dbText: {
        paddingLeft: '3%',
        paddingTop: '3%',
        fontWeight:200,
    },
    ObjectContainer: {
        width: '90%',
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

//adding padding to the textfield causes the whole div to overflow the card
//need to put it in another div or pass down props to label etc. 
export default function DbObjectScreenCard() {
    const classes = useStyles();
    const { user } = UserState();
    
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
            <Typography className={classes.heading} variant={"h6"}> Edit Database </Typography>
            <Divider className={classes.divider}/>
                {user._hasActiveDb ? (
                    <div className={classes.ObjectContainer}>
                        <DbObjectDisplay/>
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
