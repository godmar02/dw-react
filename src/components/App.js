import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import ErrorPage from 'components/ErrorPage'
import Homepage from 'components/homepage/Homepage';
import NavSidebar from 'components/NavSidebar';
import AppHeader from 'components/AppHeader';
import CharacterSheet from 'components/character/CharacterSheet';
import Campaign from 'components/campaign/Campaign';
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
        <Route exact path="/dw-react/:campaignURL" component={Campaign} />
        <Route exact path="/dw-react" component={Homepage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
    </Container>
  </Typography>
  </>)
}

export default App;
