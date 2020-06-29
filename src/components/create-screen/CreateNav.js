import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import CreateNewProjectContent from "./CreateNewProjectContent";
import CreateCurrentProjectContent from "./CreateCurrentProjectContent";
import AddProjContent from "./AddProjContent"
import Card from "@material-ui/core/Card";
import AddBoxIcon from '@material-ui/icons/AddBox';
import NewProjectExpansion from "./NewProjectExpansion";


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
    margin: '15px',
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'center'
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
            {/* Icons for nav bar */}
            <LinkTab icon={<CreateNewFolderIcon/>} {...a11yProps(0)} className={classes.linkTab}/>
            <LinkTab icon={<OpenInBrowserIcon/>} {...a11yProps(1)} />
            <LinkTab icon={<AddBoxIcon />} {...a11yProps(2)} />
          </Tabs>
        </ThemeProvider>
      </AppBar>
      <div className={classes.content}>

        {/* Create page */}
        <TabPanel value={value} index={0} >
          <div style={{marginTop: -10}}/>
          <Card style={{height: '85vh',paddingLeft: 30,paddingRight: 20, paddingBottom: 20,paddingTop:20}}>
            {/*<CreateNewProjectContent/>*/}
            <NewProjectExpansion/>
          </Card>
        </TabPanel>

        {/* Init pre-existing or current project page */}
        <TabPanel value={value} index={1}>
          <div style={{marginTop: -10}}/>
          <Card style={{height: '85vh',paddingLeft: 30,paddingRight: 20, paddingBottom: 20,paddingTop:20}}>
            <CreateCurrentProjectContent/>
          </Card>
        </TabPanel>

        {/* Add existing project to firelounge page */}
        <TabPanel value={value} index={2}>
          <div style={{marginTop:-10}}/>
          <Card style={{height: '85vh',paddingLeft: 30,paddingRight: 20, paddingBottom: 20,paddingTop:20}}>
            <AddProjContent/>
          </Card>
        </TabPanel>
      </div>
    </div>
  );
}
