import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProjectList from './ProjectList.js'
import DbList from './db-screen/DbList';
import DbInitModal from './db-screen/DbInitModal';
import { Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    padding: '0px',
    marginLeft: '65px',
    minHeight: '50px',
    height: '50px',
  },
  rightItems: {
    display: 'flex',
    marginRight: '2%',
    marginLeft: 'auto'
  }
}));

export default function TopManageNav(props) {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <div>
        <ProjectList />
      </div>
      <div className={classes.rightItems}>
        { props.activeTab === 1 ?  <DbList/> : null }
        { props.activeTab === 1 ?  <DbInitModal/> : null }
      </div>
    </Toolbar>
  );
}