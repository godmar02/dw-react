import React, {useState} from 'react';
import GlobalState from './contexts/GlobalState';
import '../index.css';
import UserProfile from './UserProfile'
import AppHeader from './AppHeader'
import CharacterSheet from './CharacterSheet'

function App(props) {
  const [state, setState] = useState({});
  const currentUser = props.currentUser;

  return (<GlobalState.Provider value={[state, setState]}>
    <UserProfile currentUser={currentUser}/>
    <AppHeader/>
    <CharacterSheet/>
  </GlobalState.Provider>)
}

export default App;
