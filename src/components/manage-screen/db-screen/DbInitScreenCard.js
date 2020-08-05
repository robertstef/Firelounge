import React from 'react'
import Card from "@material-ui/core/Card";
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import DbStepper from './DbStepper';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  card: {
    height: '92%',
    width: '92%',
    margin: '4%',
    borderRadius: '5px',
    overflow: 'auto', 
    backgroundColor: '#EDF2F4'
  },
  heading: {
    marginTop: '10px',
    width: '90%',
    marginLeft: 'auto', 
    marginRight: 'auto'
  },
  divider: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));


export default function DbInitScreenCard() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Card className={classes.card}>
                <Typography className={classes.heading}> Initialize Database </ Typography>
                <Divider className={classes.divider}/>
                <DbStepper/>
            </Card>
        </div>
    )
}  