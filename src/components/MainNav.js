import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ManageScreen from './manage-screen/ManageScreen.js'
import CreateIcon from '@material-ui/icons/Create';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateScreen from "./create-screen/CreateScreen";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ef223c'
    },
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: '#EDF2F4',
    position: 'absolute',
    left: '0px',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
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
        <ThemeProvider theme={theme}>
          <Tabs
              className={classes.tabs}
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              indicatorColor={"primary"}
          >
            <LinkTab icon={<CreateIcon />} {...a11yProps(0)} className={classes.linkTab}/>
            <LinkTab icon={<BusinessCenterIcon />} {...a11yProps(1)} className={classes.linkTab}/>
            <LinkTab icon={<SettingsIcon />} {...a11yProps(2)} className={classes.settingsTab}/>
          </Tabs>
        </ThemeProvider>
      </AppBar>
      </Box>
      <TabPanel value={value} index={0} className={classes.tabpanel}>
        <CreateScreen/>
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
