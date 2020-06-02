import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import GetPathButton from "./GetPathButton";
const axios = require('axios');

class CreateCurrentProjectContent extends Component{

    constructor(props) {
        super(props);
        this.state={
            currProjectName: '',
        }
    }

    btnDisabled() {
        return true;
    }


    handleClick(){
        //hardcoded for now - should be passed as args
        //package body of request
        var body = {
            'path': '/Users/benbaker/Documents/opench-370-project-dev/',
            'name': undefined,
            'username': 'testusername'
        }

        //call script to add project
        //should return status 200 on request and the projectid as the message
        axios.post("http://localhost:5000/insertProject", body)
            .then((response) => {
                if(response.status === 200){
                    // do something here with result lol
                }
            }).catch(error => {
                console.log(error)
        })
    }


    render(){
        return(
            <div>
                <div>
                    <Grid container>
                        <Grid item >
                            <Typography variant="h6" gutterBottom>Initialize a Pre-existing Firebase Project</Typography>
                            <div style={{marginTop:20}}/>
                            <Typography variant="h6" gutterBottom>Set Your Project Path</Typography>
                            <div style={{marginTop:10}}/>
                            <div>
                                <TextField
                                    style={{width:'70%', marginRight: '5px'}}
                                    id="outlined-size-small"
                                    size={'small'}
                                    placeholder="..."
                                    variant={"outlined"}
                                />
                                <GetPathButton/>
                            </div>
                            <div style={{marginTop:20}}/>
                            <Button variant={'outlined'} disabled={this.btnDisabled()} size={'small'} onClick={this.handleClick}>Initialize</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default CreateCurrentProjectContent;
