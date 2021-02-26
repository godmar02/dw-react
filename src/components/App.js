import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from './ErrorPage'
import NavSidebar from './NavSidebar';
import UserProfile from './UserProfile';
import AppHeader from './AppHeader';
import CharacterSheet from './CharacterSheet';
import CampaignSheet from './CampaignSheet';
import Homepage from './Homepage';

function App(props) {
  const currentUser = props.currentUser;

  return (<>
    <UserProfile currentUser={currentUser}/>
    <Router>
      <AppHeader/>
      <NavSidebar/>
      <Switch>
        <Route path="/dw-react/:campaignURL/:characterURL" component={CharacterSheet} />
        <Route path="/dw-react/:campaignURL" component={CampaignSheet} />
        <Route path="/dw-react" component={Homepage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  </>)
}

export default App;
