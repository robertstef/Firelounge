import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
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
    textField: {
        width: '100%'
    }
}));


export default function DbScreenCard() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <TextField
                    id="standard-textarea"
                    label="Query"
                    multiline
                    defaultValue="Default Value"
                    className={classes.textField}
                />
                <DbObjectDisplay/>
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
