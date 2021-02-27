import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ErrorPage from 'components/ErrorPage'
import Homepage from 'components/Homepage';
import NavSidebar from 'components/NavSidebar';
import UserProfile from 'components/profile/UserProfile';
import AppHeader from 'components/AppHeader';
import CharacterSheet from 'components/character/CharacterSheet';
import CampaignSheet from 'components/campaign/CampaignSheet';

function App(props) {
  const currentUser = props.currentUser;

  return (<>
    <UserProfile currentUser={currentUser}/>
    <Router>
      <AppHeader/>
      <NavSidebar/>
      <Switch>
        <Route exact path="/dw-react/:campaignURL/:characterURL" component={CharacterSheet} />
        <Route exact path="/dw-react/:campaignURL" component={CampaignSheet} />
        <Route exact path="/dw-react" component={Homepage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  </>)
}

export default App;
