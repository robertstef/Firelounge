import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import {UserDispatch, UserState} from '../../context/userContext'

/*
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: '10%',
    marginRight: 'auto',
    minWidth: '200px',
    height: '40px',
  },
  selectEmpty: {
    marginTop: '9px',
  },
  box: {
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '20%',
    minWidth: '250px',
    minHeight: '40px',
    backgroundColor: 'white',
    borderRadius: 10,
  }
}));
*/

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function ProjectList() {
  const classes = useStyles();

  // Context variables
  const {user} = UserState();
  const dispatch = UserDispatch();

  let projectList = []; // array of available projects
  let act_proj_name = user.act_proj.name; // name of current active project
  const projs = user.projs; // current firelounge projects

  // Fill projectList with MenuItem components to display to the user
  for (let id of Object.keys(projs)) {

    // For handleChange events.target.value is set to the project ID
    let item = <MenuItem key={id} value={id}> {projs[id].name} </MenuItem>;

    projectList.push(item);
  }

  /**
   * Updates the active project to the project selected by the
   * user using the drop down menu.
   * @param event: An event object as defined by materialUI with
   *               event.target.value equal to the project id.
   */
  const handleChange = (event) => {
    dispatch({type: 'setActive', args: event.target.value});
    act_proj_name = user.act_proj.name;
  };

  return (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Current Project</InputLabel>
          <Select
              value={act_proj_name}
              onChange={handleChange}
              label="Current Project"
          >
            {projectList.map((item) => {
              return (
                  item
              )
            })}
          </Select>
        </FormControl>
      </div>
  );
}