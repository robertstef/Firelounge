import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import AddProjContent from "./AddProjContent"
import CreateNewProjectStepper from "./CreateNewProjectStepper";


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

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function SecondaryManageNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
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
            {/* Icons for nav bar */}
            <LinkTab icon={<CreateNewFolderIcon/>} {...a11yProps(0)} className={classes.linkTab}/>
            <LinkTab icon={<OpenInBrowserIcon/>} {...a11yProps(1)} />
          </Tabs>
      </AppBar>
      <div className={classes.content}>
        {/* Create page */}
        <TabPanel value={value} index={0} >
            <CreateNewProjectStepper/>
        </TabPanel>

        {/* Add existing project to firelounge page */}
        <TabPanel value={value} index={1}>
            <AddProjContent/>
        </TabPanel>
      </div>
    </div>
  );
}
