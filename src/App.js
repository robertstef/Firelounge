import React from 'react';
import './App.css';
import Initial from "./components/initial-screen/Initial";
import {HashRouter, Switch, Route} from 'react-router-dom';
import Main from "./components/main-screen/Main";


function App() {
  return (
      <HashRouter>
          <Switch>
              <Route path="/project" component={Main} />
              <Route exact path="/" component={Initial}/>
          </Switch>
      </HashRouter>
  );
}

export default App;
