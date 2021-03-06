import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ManageScreen from './manage-screen/ManageScreen.js'
import CreateIcon from '@material-ui/icons/Create';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CreateNav from "./create-screen/CreateNav"
import SettingsModal from './settings-screen/SettingsModal.js'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#EDF2F4',
    position: 'absolute',
    left: '0px',
    top: '0px',
    height: '100%',
    width: '100%',
  },
  appbar: {
    height: '100%',
    width: '50px',
    backgroundColor: '#8d99ae',
  },
  linkTab: {
    width: '50px',
    
  },
  tabs: {
    width: '50px',
    height: '100%',
    backgroundColor: '#8d99ae',
  },
  settingsTab: {
    position: 'absolute',
    bottom: '10px',
    marginTop: 'auto'
  },
  tabpanel: {
    width: '100%'
  }
}));

export default function MainNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Box>
          <AppBar position="static" color="default" className={classes.appbar}>
              <Tabs
                  className={classes.tabs}
                  orientation="vertical"
                  value={value}
                  onChange={handleChange}
                  aria-label="nav tabs example"
                  indicatorColor={"primary"}
              >
                <LinkTab icon={<CreateIcon id={'create-proj-icon'}/>} {...a11yProps(0)} className={classes.linkTab}/>
                <LinkTab icon={<BusinessCenterIcon id={'manage-proj-icon'}/>} {...a11yProps(1)} className={classes.linkTab}/>
              </Tabs>
              
              {/* Opens Settings Modal */}
              <SettingsModal className={classes.settingsTab}/>
          </AppBar>
        </Box>

        {/* Create and init projects tab */}
        <TabPanel value={value} index={0} className={classes.tabpanel}>
          <CreateNav/>
        </TabPanel>

        {/* Manage exisiting projects tab */}
        <TabPanel value={value} index={1} className={classes.tabpanel}>
          <ManageScreen/>
        </TabPanel>
    </div>
  );
}
