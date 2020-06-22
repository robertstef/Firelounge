import React, { Component } from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import DbObjectDisplay from './DbObjectDisplay.js'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import GetFilePath from './GetDbFilePathButton'
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
        console.log(selectedPath)
        this.setState({dbPath: selectedPath});
    }

    
    /* Used to get the input from the textfield for the project name */
    handleInput = (event) => {
        this.setState({dbName: event.target.value})
    }


    openBrowser = () => {
        shell.openExternal('https://console.firebase.google.com/u/0/project/_/settings/serviceAccounts/adminSDK')
    }

    initialize = () => {
        console.log('initialize')
        console.log(this.state.dbName)
        console.log(this.state.dbPath)
    }

    render() {
        console.log(this.state)
        return(
            <div >
                <Card >
                    <Typography > Initialize Database </ Typography>
                    <Divider />
                    <Button onClick={this.openBrowser}> Get New Admin Key </Button> 
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
                    <Button onClick={this.initialize}> Initialize </Button> 
                </Card>
            </div>
        )
    }
}