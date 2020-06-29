import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {UserDispatch, UserState} from '../../../context/userContext'
import NativeSelect from '@material-ui/core/NativeSelect'


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 200,
    padding: '10px'
  },
  component: {
    position: 'absolute',
    top: '-47px',
    right: '50px',
  },

}));


export default function DbList() {
  const classes = useStyles();

  // Context variables
  const {user} = UserState();
  const dispatch = UserDispatch();

  let dbList = [];
  let act_db_name = user.act_proj.db_active;
  const dbs = user.act_proj.db_all; 

  for (let i of Object.keys(dbs)) {
    // For handleChange events.target.value is set to the project ID
    let item = <option key={i} value={i}> {i} </option>;
    dbList.push(item);
  }

  /**
   * Updates the active project to the project selected by the
   * user using the drop down menu.
   * @param event: An event object as defined by materialUI with
   *               event.target.value equal to the project id.
   */
  const handleChange = (event) => {
    //insert context dispatch here to rerender list
    console.log(user)
    dispatch({type: 'setActiveDb', args: event.target.value});
    act_db_name = event.target.value
  };

  return (
      <div className={classes.component}>
        <FormControl className={classes.formControl}>
            <NativeSelect
              value={act_db_name}
              onChange={handleChange}
              name="name"
              style={{height: '25px'}}
            >
            <optgroup label="Active">
              <option value='active'>{act_db_name}</option>
            </optgroup>
            <optgroup label="Database List">
              {dbList.map((item) => {
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