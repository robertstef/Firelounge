import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import GetPathButton from "./GetPathButton";

class CreateNewProjectContent extends Component {

    constructor(props) {
        super(props);
        this.state={
            newProjectName: '',
        }
    }

    btnDisabled() {
        return true
    }



    render() {
        return(
            <div>
                <div>
                    <Typography variant="h6" gutterBottom>Create a New Project</Typography>
                    <div style={{marginTop:10}}/>
                        <div>
                            <TextField
                                style={{width:'80%'}}
                                id="outlined-size-small"
                                size={'small'}
                                placeholder="Enter your project name"
                                variant={"outlined"}
                                color={'secondary'}
                            />
                        </div>
                    <div style={{marginTop:20}}/>
                    <Typography variant="h6" gutterBottom>Select Project's Features</Typography>
                    <div style={{marginTop:10}}/>
                        <div>
                            <FormControlLabel
                                control={<Checkbox color="primary" icon={<Brightness1OutlinedIcon fontSize="small" />} checkedIcon={<CheckCircleOutlinedIcon fontSize="small" />}/>}
                                label="Authentication"
                                labelPlacement="end"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox color="primary" icon={<Brightness1OutlinedIcon fontSize="small" />} checkedIcon={<CheckCircleOutlinedIcon fontSize="small" />}/>}
                                label="Database"
                                labelPlacement="end"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox color="primary" icon={<Brightness1OutlinedIcon fontSize="small" />} checkedIcon={<CheckCircleOutlinedIcon fontSize="small" />}/>}
                                label="Hosting"
                                labelPlacement="end"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox color="primary" icon={<Brightness1OutlinedIcon fontSize="small" />} checkedIcon={<CheckCircleOutlinedIcon fontSize="small" />}/>}
                                label="Functions"
                                labelPlacement="end"
                            />
                        </div>
                        <div style={{marginTop:10}}/>
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
                </div>
            </div>
        );
    }
}

export default CreateNewProjectContent;
