import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    switches: {
      margin: '10px'
    },
}));

/* 
Switches Group controlls the settings for the
JSON Object viewer 

Still needs to be connect to a Context/Database Object
Still needs a few text fields to get non boolean setting fields
*/
export default function SettingsSwitchesGroup() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Edit: true,
    Add: false,
    Delete: true,
    Collapsed: true,
    Clipboard: false,
    DisplayObjectSize: false,
    SortKeys: false,
    ValidationMessage: false
    //group Arrays
    //theme
    //inconStyle
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControl component="fieldset" className={classes.switches}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.Edit} onChange={handleChange} name="Edit" />}
          label="Edit"
        />
        <FormControlLabel
          control={<Switch checked={state.Add} onChange={handleChange} name="Add" />}
          label="Add"
        />
        <FormControlLabel
          control={<Switch checked={state.Delete} onChange={handleChange} name="Delete" />}
          label="Delete"
        />
        <FormControlLabel
          control={<Switch checked={state.Collapsed} onChange={handleChange} name="Collapsed" />}
          label="Collapsed"
        />
        <FormControlLabel
          control={<Switch checked={state.Clipboard} onChange={handleChange} name="Clipboard" />}
          label="Clipboard"
        />
        <FormControlLabel
          control={<Switch checked={state.DisplayObjectSize} onChange={handleChange} name="DisplayObjectSize" />}
          label="DisplayObjectSize"
        />
        <FormControlLabel
          control={<Switch checked={state.SortKeys} onChange={handleChange} name="SortKeys" />}
          label="SortKeys"
        />
        <FormControlLabel
          control={<Switch checked={state.ValidationMessage} onChange={handleChange} name="ValidationMessage" />}
          label="ValidationMessage"
        />
      </FormGroup>
    </FormControl>
  );
}
