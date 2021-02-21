import React from 'react';
import UserProfile from './UserProfile'

function App(props) {
  return (<UserProfile currentUser={props.currentUser}/>)
}

export default App;
