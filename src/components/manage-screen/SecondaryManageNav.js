import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GroupIcon from '@material-ui/icons/Group';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import StorageIcon from '@material-ui/icons/Storage';

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
          <Typography>{children}</Typography>
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
    left: '50px',
    height: '100%',
    overflow: 'hidden'
  },
  appbar: {
    height: '100%',
    width: '50px',
  },
  linkTab: {
    width: '50px',
    
  },
  tabs: {
    width: '50px',
    height: '100%'
  },
  settingsTab: {
    marginBottom: '50px',
    marginTop: 'auto'
  },
  content: {
    paddingTop: '0px'
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
        >
          <LinkTab icon={<CloudQueueIcon/>} {...a11yProps(0)} className={classes.linkTab}/>
          <LinkTab icon={<StorageIcon/>} {...a11yProps(1)} />
          <LinkTab icon={<GroupIcon/>} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div className={classes.content}>
        <TabPanel value={value} index={0}>
          Deploy Page
        </TabPanel>
        <TabPanel value={value} index={1}>
          Databse Page
        </TabPanel>
        <TabPanel value={value} index={2}>
          Users Page
        </TabPanel>
      </div>
    </div>
  );
}
