import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/main-screen/Main";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {UserProvider} from "./context/userContext";
import { AlertsProvider, createRcaSettings, createRcaTheme } from 'react-context-alerts';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ef223c'
        },
        secondary: {
            main: '#8d99ae'
        }
    }
});


const rcaTheme = createRcaTheme({
	info: {
	  body: {
		background: '#8d99ae',
		color: 'ef223c',
	  },
	},
  });

  const rcaSettings = createRcaSettings({
	timeout: null,
	showCloseButton: true,
	info: {
	  timeout: 3000,
	  showProgressBar: true,
	},
	error: {
	  enableClickAwayListener: true,
	  timeout: 3000,
	  showProgressBar: true,
	},
  });

  const rcaStyles = {
	width: '80%',
	maxWidth: 450,
	minWidth: 400,
	position: 'fixed',
	top: 10,
	right: 16,
	zIndex: 100000,
  };
  

function App() {
  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <AlertsProvider theme={rcaTheme} settings={rcaSettings} style={rcaStyles}>
            <UserProvider>
              <Route path="/" component={Main} />
            </UserProvider>
          </AlertsProvider>
        </Switch>
      </MuiThemeProvider>
    </HashRouter>
  )
};

export default App;
