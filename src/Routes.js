import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/main-screen/Main";
import Initial from "./components/initial-screen/Initial";

const Routes =  (
	<HashRouter>
	 	<Switch>
	    	<Route path="/project" component={Main} />
	      	<Route exact path="/" component={Initial}/>
	  	</Switch>
	</HashRouter>
)

export default Routes;
