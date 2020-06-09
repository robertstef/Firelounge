import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import ReactJson from 'react-json-view';
const axios = require('axios');


export default class DbScreenCard extends Component {
    state= {
        db : {}
    }

    componentDidMount() {
        axios.get("http://localhost:5000/initDB")
            .then((response) => {
                console.log(response)        
                this.setState({db : response.data})
            }).catch(error => {
                console.log(error)
            })
    };


    render() {
        var onEdit = true
        var onAdd = true

        return(
            <div style={{height: '100%', width: '100%'}}>
                <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                <ReactJson 
                    name={false}
                    src={this.state.db}
                    collapsed={1}
                    onEdit={   
                        onEdit
                            ? result => {
                                  console.log(result)
                                  this.setState({ src: result.updated_src })
                              }
                            : false
                        }
                    onAdd={
                        onAdd
                            ? result => {
                                  console.log(result)
                                  this.setState({ src: result.updated_src })
                              }
                            : false
                    }
                />
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
