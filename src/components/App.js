import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DarkState from 'components/contexts/DarkState';
import { Container, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ErrorPage from 'components/ErrorPage';
import Homepage from 'components/homepage/Homepage';
import AppHeader from 'components/AppHeader';
import CharacterSheet from 'components/character/CharacterSheet';
import Campaign from 'components/campaign/Campaign';
import CreateCharacter from 'components/character/CreateCharacter';
import '@fontsource/roboto';

export default function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  //const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  //const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      //primary: {
      //  main: mainPrimaryColor,
      //},
      //secondary: {
      //  main: mainSecondaryColor,
      //},
    },
  });

  const ctx = useMemo(() => ({ darkState, setDarkState }), [darkState]); //Memo-ised state for performance

  return (
    <DarkState.Provider value={ctx}>
      <ThemeProvider theme={darkTheme}>
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
      </ThemeProvider>
    </DarkState.Provider>
  );
}
