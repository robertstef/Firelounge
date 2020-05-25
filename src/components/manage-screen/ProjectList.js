import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';


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


function getProjects(username){
  //concat strings
  var user = username.concat('.json')

  //get project list
  var data = require('../../Users/'.concat(user))

  //add to array
  var projectList = []
  for (var item in data){
    projectList.push(item)
  }
  return projectList;
}


export default function ProjectList(props) {
  const classes = useStyles();
  const [currProject, setCurrProject] = React.useState('');

  const handleChange = (event) => {
    setCurrProject(event.target.value);

  };

  var projectList = getProjects(props.username);

  return (
      <Box className={classes.box} boxShadow={2}>
         <FormControl className={classes.formControl}>
        <Select
          value={currProject}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
        <MenuItem value="">
            <em>Select Project...</em>
          </MenuItem>
        {[...Array(projectList.length).keys()].map((value) => {

          return (
            <MenuItem key={value} value={value}>
              { projectList[value] }
            </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      </Box>
  );
}