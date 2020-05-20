import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';

class DeployScreenCard extends Component{

    render(){
        return(
            <div style={{height: '100%', width: '100%'}}>
                <Card style={{height: '100%', width: '100%', borderRadius: '5px'}}>
                    <Box boxShadow={2} style={{ marginLeft:'50px', marginTop: '25px', width: '175px', borderRadius: '5px'}}>
                        <h2 style={{textAlign: 'center', verticalAlign: 'center'}}> Deploy Page </h2>
                    </Box>
                    <Grid container spacing={3} style={{width: '100%', padding: '10px', margin: '0px'}}  >
                        <Grid item xs={12} sm={6}>
                            <Paper style={{padding: 'theme.spacing(2)', textAlign: 'center', color: 'black'}}>
                                <Switch/>
                                <Switch/>
                                <Switch/>
                                <Switch/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{padding: 'theme.spacing(2)', textAlign: 'center', color: 'black'}}>
                                <Switch/>
                                <Switch/>
                                <Switch/>
                                <Switch/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        )
    }
}

export default DeployScreenCard;

