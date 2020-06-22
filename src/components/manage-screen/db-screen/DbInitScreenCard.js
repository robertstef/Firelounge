import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import GetFilePath from './GetDbFilePathButton';
import DbStepper from './DbStepper';
const { shell } = window.require('electron')


export default class DbInitScreenCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dbName: '',
            dbPath: ''
        }
    }

    /* Callback to retrieve the selected path from GetPathButton */
    getSelectedPath = (selectedPath) => {
        this.setState({dbPath: selectedPath});
    }

    
    /* Used to get the input from the textfield for the project name */
    handleInput = (event) => {
        this.setState({dbName: event.target.value})
    }

    /* Saves path to private key, and db name in user file*/
    initialize = () => {
        //call initialization script here
        console.log(this.state)
    }

    render() {
        return(
            <div >
                <Card style={{height: '67vh', width: '95%', margin: '10px', borderRadius: '5px', overflow: 'hidden', backgroundColor: '#EDF2F4'}}>
                    <Typography style={{marginTop: '10px', width: '90%', marginLeft: 'auto', marginRight: 'auto'}}> Initialize Database </ Typography>
                    <Divider style={{ width: '90%', marginLeft: 'auto',marginRight: 'auto'}} />
                    <DbStepper/>
                </Card>
            </div>
        )
    }
}



/*
                    <GetFilePath path={this.getSelectedPath}/>
                    <TextField  
                        style={{width:'80%'}}
                        id="outlined-size-small"
                        size={'small'}
                        placeholder="Enter your database name (Optional)"
                        variant={"outlined"}
                        color={'secondary'}
                        value={this.state.dbName}
                        onChange={this.handleInput}
                    />
                    */  