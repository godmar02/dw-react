import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import ErrorPage from 'components/ErrorPage';
import Homepage from 'components/homepage/Homepage';
import AppHeader from 'components/AppHeader';
import CharacterSheet from 'components/character/CharacterSheet';
import Campaign from 'components/campaign/Campaign';
import CreateCharacter from 'components/character/CreateCharacter';
import '@fontsource/roboto';

export default function App() {
  return (
    <Typography component={'span'}>
      <AppHeader />
      <Container>
        <Router>
          <Switch>
            <Route exact={true} path='/dw-react' component={Homepage} />
            <Route
              exact={true}
              path='/dw-react/:campaignURL'
              component={Campaign}
            />
            <Route
              exact={true}
              path='/dw-react/:campaignURL/create-character'
              component={CreateCharacter}
            />
            <Route
              exact={true}
              path='/dw-react/:campaignURL/:characterURL'
              component={CharacterSheet}
            />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </Container>
    </Typography>
  );
}
