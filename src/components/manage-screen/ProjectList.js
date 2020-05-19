import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: '-5px',
    marginLeft: '25%',
    minWidth: 200,
    height: '50px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProjectList() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
         <FormControl className={classes.formControl}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Select Project...</em>
          </MenuItem>
          <MenuItem value={10}>Project 1</MenuItem>
          <MenuItem value={20}>Project 2</MenuItem>
          <MenuItem value={30}>Project 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}