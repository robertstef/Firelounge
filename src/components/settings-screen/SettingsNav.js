import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StorageIcon from '@material-ui/icons/Storage';
import DbSettingsCard from './DbSettingsCard'
import UserSettingsCard from './UserSettingsCard'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div style={{height: 'calc(100% - 48px)'}}>{children}</div>  
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
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#8d99ae',
    height: '100%',
  },
  appBar: {
    position: 'static',
    marginTop: '0px'
  },
  tabPanel: {
    height: '100%',
  },

}));

/* 
* Navigation Bar at the top of the Settings Modal
* @props close: setState function which toggles the SettingsModal display true/false
* Props passed to UserSettingsCard, DbSettingsCard
*/
export default function SettingsNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tab icon={<AccountCircleIcon  id={'settings-user-icon'} />} aria-label="phone" {...a11yProps(0)} />
            <Tab icon={<StorageIcon id={'settings-database-icon'}/>} aria-label="favorite" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      {/* Tab for User Settings*/}
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <UserSettingsCard close={props.close}/>
      </TabPanel>

      {/* Tab for Database Settings*/}
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <DbSettingsCard close={props.close}/>
      </TabPanel>

    </div>
  );
}
