import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectList from './ProjectList.js'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0px'
  }
}));

export default function TopManageNav() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ProjectList />
    </div>
  );
}