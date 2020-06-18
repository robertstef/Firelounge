import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GetPathButton from "./GetPathButton";


class CreateCurrentProjectContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectPath: ''
        }
    }
    
    btnDisabled() {
        return false;
    }

    /* Handles the click event of the initialize button */
    handleClick = () => {
        
        //package body of request
        var body = {
            'path': this.state.projectPath, 
            'name': this.state.projectName,
            'username': 'testusername'
        }
        
        const insertProject_module = require('../../scripts/insertProject.js')
        
        insertProject_module.insertProject_function(body).then((output) => {
                console.log('Success!')
            }).catch(err => {
                console.log(err)
            });
    }

    /* Used to get the input from the textfield for the project name */
    handleChange = (event) => {
        this.setState({projectName: event.target.value})
    }

    /* Callback to retrieve the selected path from GetPathButton */
    getSelectedPath = (selectedPath) => {
        this.setState({projectPath: selectedPath})
    }

    render(){
        return(
            <div>
                <div>
                    <Typography variant="h6" gutterBottom>Initialize a Pre-existing Firebase Project</Typography>
                    <div style={{marginTop:20}}>
                        <TextField
                            style={{width:'80%'}}
                            id="outlined-size-small"
                            size={'small'}
                            placeholder="Enter your project name (Optional)"
                            variant={"outlined"}
                            color={'secondary'}
                            value={this.state.projectName}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div style={{marginTop:20}}/>
                    <GetPathButton path={this.getSelectedPath}/>
                    <Button style={{marginTop:20}} variant={'outlined'} disabled={this.btnDisabled()} size={'small'} onClick={this.handleClick}>Initialize</Button>
                </div>
            </div>
        )
    }
}

export default CreateCurrentProjectContent;
