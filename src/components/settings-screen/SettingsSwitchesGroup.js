import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {UserDispatch, UserState} from "../../context/userContext";
import { Alert } from 'react-context-alerts';

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
    },
    button: {
      position: 'absolute',
      right: '10%',
      bottom: '10%',
      backgroundColor: '#8D99AE'
  },
}));

/* 
Switches Group controlls the settings for the
JSON Object viewer 
*/

//TODO: Still needs a few text fields to get non boolean setting fields
//TODO: Change List to loop 
export default function SettingsSwitchesGroup(props) {
  const classes = useStyles();
  const dispatch = UserDispatch();
  const {user} = UserState();  
  const [alert, setAlert]  = React.useState({display: false, message: '', type: 'info'});  
  const [state, setState] = React.useState({
    Add: false,
    Edit: false,
    Delete: false,
    Collapsed: false,
    Clipboard: false,
    DisplayObjectSize: false,
    SortKeys: false,
    DisplayDataType: false
  });


  useEffect(() => {
    setState(user.act_db_settings);
  }, [])


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClick = async () => {
    try {
      const updateSettings = async () => {
        dispatch({type:"saveDbSettings", args: state});  
        await setAlert({display: true, message: 'Settings Succesfully Updated', type: 'success'})
        props.close(false);
      }
      updateSettings();
    } catch (error) {
      setAlert({display: true, message: error, type: 'error'})
    }
    
  }

  return (
    <div>
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
                control={<Switch checked={state.DisplayDataType} onChange={handleChange} name="DisplayDataType" />}
                label={<Typography className={classes.label} >DisplayDataType</Typography>}
              />
            </ListItem>
          </ List>
        </FormGroup>
      </FormControl>
      <Button className={classes.button} color={'default'} onClick={handleClick}> Save </Button>
      <Alert type={alert.type} open={alert.display} message={alert.message} timeout={5000} onClose={()=>{ setAlert({display:false, message:'', type: 'info'})} }/>
    </div>
  );
}
