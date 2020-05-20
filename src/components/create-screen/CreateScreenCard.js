import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


class CreateScreenCard extends Component{


    constructor(props) {
        super(props);
        this.state={
            projectName: '',
        }
    }

    render(){
        return(
            <div style={{padding: 15, height:'100%',}}>
                <Grid container>
                    <Grid item style={{width:'100%', height:'100%'}}>
                        <Card style={{height: '87vh',paddingLeft: 30,paddingRight: 20, paddingBottom: 20,paddingTop:20}}>
                            <Grid container spacing={3}>
                                <Grid item style={{width:'48%'}}>
                                    <div>
                                        <Typography variant="h6" gutterBottom>Create a New Project</Typography>
                                        <div style={{marginTop:15}}/>
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
                                        <div style={{marginTop:20}}/>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Divider orientation={'vertical'} style={{height: '87vh'}}/>
                                </Grid>
                                <Grid item style={{width:'48%'}}>
                                    <div>
                                        <Typography variant="h6" gutterBottom>Initialize a Current Project</Typography>
                                        <div style={{marginTop:15}}/>
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
                                        <div style={{marginTop:20}}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CreateScreenCard;

