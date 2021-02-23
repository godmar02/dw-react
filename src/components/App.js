import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from './ErrorPage'
import NavSidebar from './NavSidebar';
import UserProfile from './UserProfile';
import AppHeader from './AppHeader';
import CharacterSheet from './CharacterSheet';

function App(props) {
  const currentUser = props.currentUser;

  return (<>
    <UserProfile currentUser={currentUser}/>
    <AppHeader/>
    <Router>
      <NavSidebar/>
      <Switch>
        <Route path="/" children={<CharacterSheet/>} />
        <Route path="/:campaign" children={<CharacterSheet/>} />
        <Route path="/:campaign/:character" children={<CharacterSheet/>} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  </>)
}

export default App;
