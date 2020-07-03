import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/main-screen/Main";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {UserProvider} from "./context/userContext";

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
					<UserProvider>
						<Route path="/" component={Main} />
					</UserProvider>
				</Switch>
		  	</MuiThemeProvider>
		</HashRouter>
	)
}

export default Routes;
