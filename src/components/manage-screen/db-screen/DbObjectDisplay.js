import React, { Component } from 'react'
import ReactJson from 'react-json-view';

const axios = require('axios');


export default class DbObjectDisplay extends Component {
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
            </div>
        )
    }
}