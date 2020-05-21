import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {createMuiTheme} from "@material-ui/core/styles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef223c'
        },
    }
});


class CreateNewProjectContent extends Component {

    constructor(props) {
        super(props);
        this.state={
            newProjectName: '',
        }
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
                            defaultValue="Enter your project name"
                            variant={"outlined"}
                        />
                    </div>
                    <div style={{marginTop:20}}/>
                    <Typography variant="h6" gutterBottom>Select Project's Features</Typography>
                    <div style={{marginTop:10}}/>
                    <ThemeProvider theme={theme}>
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
                    </ThemeProvider>
                </div>
            </div>
        );
    }
}

export default CreateNewProjectContent;
