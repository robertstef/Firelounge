import React from 'react';
import {FormControl, FormGroup, FormControlLabel, Switch, Button, makeStyles, List, ListItem} from '@material-ui/core';
import {UserState} from '../../../context/userContext';
import { Alert } from 'react-context-alerts';
import CircularProgress from "../../Utility/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    formControl: {
    },
    formGroup: {
    },
    list: {
    },
    listItem: {
    },
    label: {
        fontWeight: 200,
    },
    button: {
        backgroundColor: '#EDF2F4',
        fontWeight: 200,
        color: '#EF233C',
        width: '100%',
        margin: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 25,
    },
    alert: {
        borderRadius : 25,
        position: 'absolute',
        bottom: '2%',
        width: '80%',
    },
}));


export default function SwitchesGroup() {
  const classes = useStyles();
  const {user} = UserState();
  const [loading, setLoading] = React.useState(false);

  /* State is for all Firebase options */ 
  const [state, setState] = React.useState({
    all: false,
    hosting: false,
    database: false,
    storage: false,
    functions: false,
  });

  /* Ables/Disbales the deploy button  */
  function btnDisabled() {
    const isDisabled = (currentValue) => currentValue === false;
    return Object.values(state).every(isDisabled);
  }

  /* Handles changes to the buttons ie when the all button is selected*/ 
  const handleChange = (event) => {
    // only make changes if all isnt true or the change is to the all switch
    if ( event.target.name === 'all' || state.all !== true ) {
      setState({ ...state, [event.target.name]: event.target.checked });
    }

    //change all switches to true if all is selected    
    if ( event.target.name === 'all' && state.all === false){
      setState({
        all: true,
        hosting: true,
        database: true,
        storage: true,
        functions: true,
      })
      // if all is unselected -- set state to all false
    } else if (event.target.name === 'all' && state.all === true){
        setState({
        all: false,
        hosting: false,
        database: false,
        storage: false,
        functions: false,
      })
    }

  };
  
  // React context alert for successful/failed deploy
  const [showAlert, setAlert] = React.useState({display: false, status: '', data: '', type: '', header: ''});

  /* Calls the deploy script */ 
  const deployItems = (state) =>{
    setLoading(true);
    let arg = {
        deployOptions: state.state,
        act_proj: user.act_proj,
    };


    const deployModule = require('../../../scripts/deploy');
    deployModule.deployProject_function(arg).then((output) => {
        setLoading(false)
        console.log(output); // log the data for the sake of viewing the result

        let results = {
            display: true,
            status: output.resp,
            data: output.data,
            type: 'success',
            header: 'Project has been deployed!'

        };
        setAlert(prevState => results)
        // display a success alert

    }).catch(err => {
        setLoading(false)
        console.log(err);
        // display an error alert
        let results = {
            display: true,
            status: err.resp,
            data: err.data,
            type: 'error',
            header: "Project could not be deployed!"
        };
        setAlert(prevState => results)
    })

  };

  //calc the number of cols displayed (this solution works poorly for 4 cols)
  let num_cols;
  if (user.act_proj.features.length === 1 || user.act_proj.features.length === 3 ) {
    num_cols = 2
  } else if (user.act_proj.features.length === 2 ) {
    num_cols = 3
  } else {
    num_cols = 1
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup className={classes.formGroup}>
          <List dense={true} className={classes.list} style={{columnCount:num_cols}}>
            {[...Array(user.act_proj.features.length).keys()].map(value => {
            return (
            <ListItem key={`${value}`} className={classes.listItem}>
              <FormControlLabel
                  classes={{label: classes.label}}
                  label={user.act_proj.features[`${value}`].charAt(0).toUpperCase() + user.act_proj.features[`${value}`].slice(1)}
                  control={
                      <Switch checked={state[`${user.act_proj.features[`${value}`]}`]}
                      onChange={handleChange}
                      name={`${user.act_proj.features[`${value}`]}`} 
                      id= {`manage-deploy-switch-${user.act_proj.features[`${value}`]}`} />}
              />    
            </ListItem>
              );
            })}
            <ListItem className={classes.listItem}>
              <FormControlLabel
                  classes={{label: classes.label}}
                  control={<Switch checked={state.all} onChange={handleChange} name="all" id={'manage-deploy-switch-all'} />}
                  label="All"
              />    
            </ListItem>
          </ List>
        </FormGroup>
      </FormControl>
        <div style={{margin: '2%'}}/>
      <Button className={classes.button} onClick={() => {deployItems({state})} } disabled={btnDisabled()} >DEPLOY PROJECT</Button>
      <Alert open={showAlert.display} onClose={() => {setAlert({display: false, status: '', data: '', type: '', header: ''})}} type={showAlert.type} timeout={null} message={showAlert.data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')} header={showAlert.header} />
      {loading ?  <CircularProgress/> : null }
   </div>
  );
}
