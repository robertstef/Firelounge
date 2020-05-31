import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/main-screen/Main";
import Initial from "./components/initial-screen/Initial";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    pallette: {
        primary: {
            main: '#ef223c'
        },
        secondary: {
            main: '#8d99ae'
        }
    }
});

function Routes() {
	return (
		<HashRouter>
			<MuiThemeProvider theme={theme}>
			 	<Switch>
			    	<Route path="/project" component={Main} />
			      	<Route exact path="/" component={Initial}/>
			  	</Switch>
		  	</MuiThemeProvider>
		</HashRouter>
	)
}

export default Routes;
