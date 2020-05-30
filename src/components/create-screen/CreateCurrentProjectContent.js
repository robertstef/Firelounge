import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
                                <Button size={'small'} variant={'outlined'} style={{height:'40px'}}>...</Button>
                            </div>
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
