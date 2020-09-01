import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, AppBar, Tabs, Tab, Box} from '@material-ui/core';
import {PanTool, CloudQueue, Storage} from '@material-ui/icons';
import DeployScreen from './deploy-screen/DeployScreen.js'
import DbQueryScreen from './db-query-screen/DbQueryScreen.js'
import DbObjectScreen from './db-object-screen/DbObjectScreen.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{height: '100%', width: '100%'}}
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{padding: '0px',left: '0px', top: '0px', height: '100%', width: '100%'}}>
          <div style={{padding: '0px',left: '0px', top: '0px', height: '100%', width: '100%'}}>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      style={{minWidth: '50px'}}
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '49px',
    backgroundColor: 'inherit',
    position: 'absolute',
    display: 'flex',
    left: '0px',
    right: '0px',
    marginLeft: '52px',
    top: '0px',
    bottom: '0px',
  },
  appbar: {
    width: '50px',
    height: '100%',
    borderRadius: '0px 10px 0px 0px',
    backgroundColor: '#8d99ae',
  },
  linkTab: {
    width: '50px',
    
  },
  tabs: {
    width: '50px',
    height: '100%',
    borderRadius: '0px 10px 10px 0px',
    backgroundColor: '#8d99ae',
  },
  settingsTab: {
    marginBottom: '50px',
    marginTop: 'auto'
  },
  content: {
    width: '100%',
    margin: '2%',
  }
}));

export default function SecondaryManageNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    //callback to inform topNav what the active tab is
    props.getActiveTab(newValue);
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
          <Tabs
              orientation='vertical'
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              className={classes.tabs}
              indicatorColor={"primary"}
          >
            <LinkTab icon={<CloudQueue/>} {...a11yProps(0)} className={classes.linkTab}/>
            <LinkTab icon={<Storage/>} {...a11yProps(1)} />
            <LinkTab icon={<PanTool/>} {...a11yProps(2)} />
          </Tabs>
      </AppBar>
      <div className={classes.content}>
        <TabPanel value={value} index={0} >
          <DeployScreen />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DbQueryScreen />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DbObjectScreen />
        </TabPanel>
      </div>
    </div>
  );
}
