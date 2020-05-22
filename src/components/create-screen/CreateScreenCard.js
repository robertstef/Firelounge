import React, {Component} from 'react'
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CreateNewProjectContent from "./CreateNewProjectContent";
import CreateCurrentProjectContent from "./CreateCurrentProjectContent";


class CreateScreenCard extends Component{

    render(){
        return(
            <div style={{padding: 15, height:'100%',}}>
                <Grid container>
                    <Grid item style={{width:'100%', height:'100%'}}>
                        <Card style={{height: '87vh',paddingLeft: 30,paddingRight: 20, paddingBottom: 20,paddingTop:20}}>
                            <Grid container spacing={3}>
                                <Grid item style={{width:'48%'}}>
                                    <CreateNewProjectContent/>
                                </Grid>
                                <Grid item>
                                    <Divider orientation={'vertical'} style={{height: '87vh'}}/>
                                </Grid>
                                <Grid item style={{width:'48%'}}>
                                    <CreateCurrentProjectContent/>
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

/*
 */
