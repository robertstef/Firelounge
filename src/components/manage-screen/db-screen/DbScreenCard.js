import React from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
import { makeStyles } from '@material-ui/core/styles'
import executeQuery from '../../../db-queries/execute';
import {UserState} from '../../../context/userContext';

const useStyles = makeStyles((theme) => ({
    root: {
        left: '0px',
        right: '0px',
        height: '100%',
    },
    card: {
        height: '100%',
    },
    textField: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

//adding padding to the textfield causes the whole div to overflow the card
//need to put it in another div or pass down props to label etc. 
export default function DbScreenCard() {
    const classes = useStyles();
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
