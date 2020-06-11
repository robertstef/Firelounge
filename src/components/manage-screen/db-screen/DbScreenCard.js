import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'

export default class DbScreenCard extends Component {

    render() {
        return(
            <div style={{height: '100%', width: '100%'}}>
                <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                    <TextField
                        id="standard-textarea"
                        label="Query"
                        multiline
                        defaultValue="Default Value"
                        style={{width: '100%'}}
                    />
                    <DbObjectDisplay/>
                </Card>
            </div>
        )
    }
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
