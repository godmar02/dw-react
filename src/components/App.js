import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavSidebar from './NavSidebar';
import UserProfile from './UserProfile';
import AppHeader from './AppHeader';
import CharacterSheet from './CharacterSheet';

function App(props) {
  const currentUser = props.currentUser;

  return (<div>
    <UserProfile currentUser={currentUser}/>
    <AppHeader/>
    <Router>
      <NavSidebar/>
      <Switch>
        <Route path="/:id" children={<CharacterSheet/>} />
        <Route path="/:id" children={<CharacterSheet/>} />
        <Route path="/:id" children={<CharacterSheet/>} />
      </Switch>
    </Router>
  </div>)
}

export default App;
