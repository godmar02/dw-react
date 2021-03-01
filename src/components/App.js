import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import ErrorPage from 'components/ErrorPage'
import CampaignsHomepage from 'components/campaign/CampaignsHomepage';
import NavSidebar from 'components/NavSidebar';
import AppHeader from 'components/AppHeader';
import CharacterSheet from 'components/character/CharacterSheet';
import CampaignSheet from 'components/campaign/CampaignSheet';
import {Container,Typography} from '@material-ui/core';
import "@fontsource/roboto"

function App() {

  return (<>
    <Typography>
    <Container>
    <Router>
      <AppHeader/>
      <NavSidebar/>
      <Switch>
        <Route exact path="/dw-react/:campaignURL/:characterURL" component={CharacterSheet} />
        <Route exact path="/dw-react/:campaignURL" component={CampaignSheet} />
        <Route exact path="/dw-react" component={CampaignsHomepage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
    </Container>
  </Typography>
  </>)
}

export default App;
