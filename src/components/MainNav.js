import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ManageScreen from './manage-screen/ManageScreen.js'
import CreateIcon from '@material-ui/icons/Create';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';

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
        <Box p={3} style={{padding: '0px'}}>
          <div >{children}</div>
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
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    left: '0px',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  appbar: {
    height: '100%',
    width: '50px'
  },
  linkTab: {
    width: '50px',
    
  },
  tabs: {
    width: '50px',
    height: '100%'
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
      <AppBar position="static" color="default" className={classes.appbar}>
        <Tabs
              className={classes.tabs}
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
          <LinkTab icon={<CreateIcon />} {...a11yProps(0)} className={classes.linkTab}/>
          <LinkTab icon={<BusinessCenterIcon />} {...a11yProps(1)} className={classes.linkTab}/>
          <LinkTab icon={<SettingsIcon />} {...a11yProps(2)} className={classes.settingsTab}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabpanel}>
        Create Screen
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanel}>
        <ManageScreen/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanel}>
        Settings Page
      </TabPanel>
    </div>
  );
}
