import React from 'react';
import { makeStyles, Toolbar } from '@material-ui/core';
import ProjectList from './ProjectList.js'
import DbList from './DbList';
import DbInitModal from './DbInitModal';

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
        { props.activeTab === 1 || props.activeTab === 2  ?  <DbList/> : null }
        { props.activeTab === 1 || props.activeTab === 2  ?   <DbInitModal/> : null }
      </div>
    </Toolbar>
  );
}