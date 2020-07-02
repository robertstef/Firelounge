import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      margin: theme.spacing(20),
    },
    'backgroundColor': 'grey',
    'opacity': 0.5,
    'position': 'absolute',
    'zIndex': 2000,
    'top': 0,
    'left': 0,
    'bottom': 0,
    'right': 0,
  },
  circle: {
    'position': 'absolute',
    marginLeft: '50%',
    marginTop: '35%'
  }
}));

export default function CircularIndeterminate(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circle}/>
    </div>
  );
}
