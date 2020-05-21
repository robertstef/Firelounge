import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import SwitchesGroup from './SwitchesGroup.js';

class DeployScreenCard extends Component{

 render(){
        return(
            <div style={{height: '100%', width: '100%'}}>
                <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                    <Box boxShadow={2} style={{ marginLeft:'50px', marginTop: '25px', width: '175px', borderRadius: '5px'}}>
                        <h2 style={{textAlign: 'center', verticalAlign: 'center'}}> Deploy Page </h2>
                    </Box>
                    <SwitchesGroup/>
                </Card>
            </div>
        )
    }
}

export default DeployScreenCard;




