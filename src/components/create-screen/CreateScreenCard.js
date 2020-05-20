import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
   root: {
       padding: 30,
   },
    card: {
       height: window.innerHeight - 80,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        borderRadius: 25,
    },
}));


class CreateScreenCard extends Component{


    constructor(props) {
        super(props);
        this.state={
            projectName: '',
        }
    }

    render(){
        return(
            <div style={{padding: 30,}}>
                <Card style={{height: window.innerHeight - 80, paddingLeft: 30,paddingRight: 20, paddingBottom: 20, borderRadius: 25,}}>
                    <Grid container spacing={8}>
                        <Grid item style={{width:"78%"}}>
                            <div>
                                <h2>Create a New Project</h2>
                                <div style={{marginTop:40}}/>
                                <div>
                                    <TextField
                                        style={{width:'70%'}}
                                        id="outlined-size-normal"
                                        defaultValue="Enter your project name"
                                        variant={"standard"}
                                    />
                                </div>
                                <div style={{marginTop:40}}/>
                                <h2>Select Project's Features</h2>
                                <div style={{marginTop:40}}/>

                                <Button style={{position: 'absolute', right: 190, bottom: 40,}}>Create</Button>
                            </div>
                        </Grid>
                        <Grid item style={{background:'linear-gradient(to right bottom, #667eea, #764ba2)', height: window.innerHeight, width:145}}>
                            <div/>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
}

export default CreateScreenCard;

