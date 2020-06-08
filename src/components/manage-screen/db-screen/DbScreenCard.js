import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";


const axios = require('axios');

export default class DbScreenCard extends Component {
    state= {
        db : ''
    }

    componentDidMount() {
        axios.get("http://localhost:5000/initDB")
            .then((response) => {
                console.log(response)        
                this.setState({db : JSON.stringify(response)})
            }).catch(error => {
                console.log(error)
        })

    }

    render() {
        return(
            <div style={{height: '100%', width: '100%'}}>
                <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                {this.state.db}
                </Card>
            </div>
        )
    }
}



