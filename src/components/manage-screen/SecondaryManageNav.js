import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import GroupIcon from '@material-ui/icons/Group';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import StorageIcon from '@material-ui/icons/Storage';
import DeployScreen from './DeployScreen.js'

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
        <Box p={3} style={{padding: '0px', height: '100%', width: '100%'}}>
          <div style={{height: '100%', width: '100%'}}>{children}</div>
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
    backgroundColor: 'inherit',
    position: 'absolute',
    left: '51px',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  appbar: {
    height: '100%',
    width: '50px',
    borderRadius: '0px 10px 10px 0px',
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
    paddingRight: '90px',
    marginLeft: '35px',
    paddingBottom: '90px',
    marginTop: '35px',
    paddingTop: '0px',
  }
}));

export default function SecondaryManageNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <ThemeProvider theme={theme}>
          <Tabs
              orientation='vertical'
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
              className={classes.tabs}
              indicatorColor={"primary"}
          >
            <LinkTab icon={<CloudQueueIcon/>} {...a11yProps(0)} className={classes.linkTab}/>
            <LinkTab icon={<StorageIcon/>} {...a11yProps(1)} />
            <LinkTab icon={<GroupIcon/>} {...a11yProps(2)} />
          </Tabs>
        </ThemeProvider>
      </AppBar>
      <div className={classes.content}>
        <TabPanel value={value} index={0} >
          <DeployScreen currProject={props.currProject} username={props.username}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Database Page
        </TabPanel>
        <TabPanel value={value} index={2}>
          Users Page
        </TabPanel>
      </div>
    </div>
  );
}
