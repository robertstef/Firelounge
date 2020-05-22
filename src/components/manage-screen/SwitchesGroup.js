import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';




export default function SwitchesGroup() {
  const [state, setState] = React.useState({
    hosting: false,
    database: false,
    storage: false,
    functions: false,
  });

  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //used for testing purposes - state can be removed when ready along with <p> below
  //calling the deploy python script can occur here
  const [displayState, setDisplayState] = React.useState({})
  const deployItems = (state) =>{
    setDisplayState({
      state
    })
  }

  return (
    <div style={{marginLeft: '50px'}}>
      <FormControl component="fieldset" style={{width: '100%'}}>
        <FormGroup>
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
      <Button onClick={ () => {deployItems({state})} } style={{backgroundColor: '#EDF2F4', color: '#EF233C'}}>
        DEPLOY!
      </Button>
      <p> Deploying.... {JSON.stringify(displayState)} </p>
    </div>
  );
}