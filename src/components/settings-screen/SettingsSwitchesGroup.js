import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    formGroup: {
      margin: '5%'
    },
    list: {
      padding: '0px',
      columnCount: 2,
    },
    listItem: {
      maxWidth: '100px',
      marginRight: '0px',
      padding: '0px'
    },
    label: {
      fontSize: 12, 
    }
}));

/* 
Switches Group controlls the settings for the
JSON Object viewer 
*/
//TODO: Still needs to be connect to a Context/Database Object
//TODO: Still needs a few text fields to get non boolean setting fields
//TODO: Change List to loop 
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
    <FormControl component="fieldset" className={classes.formGroup}>
      <FormGroup>
        <List dense={true} className={classes.list}>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.Edit} onChange={handleChange} name="Edit" />}
               label={<Typography className={classes.label} >Edit</Typography>}
            /> 
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.Add} onChange={handleChange} name="Add" />}
              label={<Typography className={classes.label} >Add</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.Delete} onChange={handleChange} name="Delete" />}
              label={<Typography className={classes.label} >Delete</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.Collapsed} onChange={handleChange} name="Collapsed" />}
              label={<Typography className={classes.label} >Collapsed</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.Clipboard} onChange={handleChange} name="Clipboard" />}
              label={<Typography className={classes.label} >Clipboard</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.DisplayObjectSize} onChange={handleChange} name="DisplayObjectSize" />}
              label={<Typography className={classes.label} >DisplayObjectSize</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.SortKeys} onChange={handleChange} name="SortKeys" />}
              label={<Typography className={classes.label} >SortKeys</Typography>}
            />
          </ListItem>
          <ListItem className={classes.listItem} >
            <FormControlLabel
              control={<Switch checked={state.ValidationMessage} onChange={handleChange} name="ValidationMessage" />}
              label={<Typography className={classes.label} >ValidationMessage</Typography>}
            />
          </ListItem>
        </ List>
      </FormGroup>
    </FormControl>
  );
}
