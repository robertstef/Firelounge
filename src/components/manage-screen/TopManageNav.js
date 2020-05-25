import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectList from './ProjectList.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  }
}));

export default function TopManageNav(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <ProjectList username={props.username}/>
    </div>
  );
}