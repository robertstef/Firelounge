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
    'height': 'calc(100% + 50px)',
    'width': 'calc(100% + 50px)',
    'top': '-50px',
    'bottom': 0,
    'right': 0,
  },
  circle: {
    'position': 'absolute',
    marginLeft: '50%',
    marginTop: '30%'
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circle} id='circular-progress'/>
    </div>
  );
}
