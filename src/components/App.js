import React from 'react';
import UserProfile from './UserProfile'
import AppHeader from './AppHeader'
import CharacterSheet from './CharacterSheet'

function App(props) {
  const currentUser = props.currentUser;

  return (<div>
    <UserProfile currentUser={currentUser}/>
    <AppHeader/>
    <CharacterSheet/>
  </div>)
}

export default App;
