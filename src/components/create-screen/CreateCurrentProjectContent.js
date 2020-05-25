import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Brightness1OutlinedIcon from "@material-ui/icons/Brightness1Outlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import {createMuiTheme} from "@material-ui/core/styles";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef223c'
        },
        secondary: {
            main: '#8d99ae'
        }
    }
});


class CreateCurrentProjectContent extends Component{

    constructor(props) {
        super(props);
        this.state={
            currProjectName: '',
        }
    }

    btnDisabled() {
        return true
    }


    render(){
        return(
            <div>
                <div>
                    <Grid container>
                        <Grid item style={{width: '48%'}}>
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
                                <Button size={'small'} variant={'outlined'} style={{height:'40px'}}>...</Button>
                            </div>
                            <div style={{marginTop:20}}/>
                            <Button variant={'outlined'} disabled={this.btnDisabled()} size={'small'}>Initialize</Button>
                        </Grid>
                        <Grid item>
                            <Divider orientation={'vertical'} style={{marginRight:'20px', height:'85vh'}}/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>Initialize a Current Project</Typography>
                            <div style={{marginTop:52}}/>
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
                                <Button size={'small'} variant={'outlined'} style={{height:'40px'}}>...</Button>
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
                            <div style={{marginTop:20}}/>
                            <Button variant={'outlined'} disabled={this.btnDisabled()} size={'small'}>Initialize</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default CreateCurrentProjectContent;
