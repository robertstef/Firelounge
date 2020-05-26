import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import SwitchesGroup from './SwitchesGroup.js';

function DeployScreenCard(props) {
    return(
        <div style={{height: '100%', width: '100%'}}>
            <Card style={{height: '87vh', width: '100%', borderRadius: '5px'}}>
                <Box boxShadow={2} style={{ marginLeft:'50px', marginTop: '25px', width: '175px', borderRadius: '5px'}}>
                    <h2 style={{textAlign: 'center', verticalAlign: 'center'}}> Deploy Page </h2>
                </Box>
                <SwitchesGroup username={props.username} currProject={props.currProject}/>
            </Card>
        </div>
    )
}

export default DeployScreenCard;




