import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
<<<<<<< HEAD
const axios = require('axios');
=======
import {UserState} from '../../context/userContext';

export default function SwitchesGroup() {

  const {user} = UserState();
>>>>>>> 4d88a85bc69b6dc61769254149d55b4f9a84ca5f

  const [state, setState] = React.useState({
    all: false,
    hosting: false,
    database: false,
    storage: false,
    functions: false,
  });

  function btnDisabled() {
    const isDisabled = (currentValue) => currentValue === false;
    return Object.values(state).every(isDisabled);
  }

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
      });
    }


  };

  //used for testing purposes - state can be removed when ready along with <p> below
  //calling the deploy python script can occur here
  const [displayState, setDisplayState] = React.useState({});

  const deployItems = (state) =>{
    setDisplayState({
      state
    });
    // need to send an axios request here with the state state.state
    axios.post("http://localhost:5000/deployProject", state.state).then(res => {
      console.log(res.data) // log the data for the sake of viewing the result
    })
  };

  return (
    <div style={{marginLeft: '50px'}}>
      <FormControl component="fieldset" style={{width: '100%'}}>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={state.all} onChange={handleChange} name="all" />}
            label="All"
          />
          <FormControlLabel
            control={<Switch checked={state.hosting} onChange={handleChange} name="hosting" />}
            label="Hosting"
          />
          <FormControlLabel
            control={<Switch checked={state.database} onChange={handleChange} name="database" />}
            label="Database"
          />
          <FormControlLabel
            control={<Switch checked={state.storage} onChange={handleChange} name="storage" />}
            label="Storage"
          />
          <FormControlLabel
            control={<Switch checked={state.functions} onChange={handleChange} name="functions" />}
            label="Functions"
          />
        </FormGroup>
      </FormControl>
      <Button onClick={() => {deployItems({state})} } disabled={btnDisabled()} style={{backgroundColor: '#EDF2F4', color: '#EF233C'}}>
        DEPLOY! :-)
      </Button>
      <p> username: {user.uname}</p>
      <p> active project: {user.act_proj.name}</p>
      <p> Deploying.... {JSON.stringify(displayState)} </p>
    </div>
  );
}
