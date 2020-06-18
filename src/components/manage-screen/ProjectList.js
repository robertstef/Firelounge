import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {UserDispatch, UserState} from '../../context/userContext'
import NativeSelect from '@material-ui/core/NativeSelect'


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    padding: '10px'
  },
  component: {
    marginLeft: '75px',
    height: 50,
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
    let item = <option key={id} value={id}> {projs[id].name} </option>;
    projectList.push(item);
  }

  /**
   * Updates the active project to the project selected by the
   * user using the drop down menu.
   * @param event: An event object as defined by materialUI with
   *               event.target.value equal to the project id.
   */
  const handleChange = (event) => {
    if(event.target.value !== 'active'){
      dispatch({type: 'setActive', args: event.target.value});
      act_proj_name = user.act_proj.name;
    }
  };

  return (
      <div className={classes.component}>
        <FormControl className={classes.formControl}>
            <NativeSelect
              value={act_proj_name}
              onChange={handleChange}
              name="name"
              style={{height: '25px'}}
            >
            <optgroup label="Active">
              <option value='active'>{act_proj_name}</option>
            </optgroup>
            <optgroup label="Project List">
              {projectList.map((item) => {
                return (
                    item
                )
              })}            
            </optgroup>
          </NativeSelect>
        </FormControl>
      </div>
  );
}