import React from 'react';
import UserProfile from './UserProfile'
import AppHeader from './AppHeader'

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }

  render() {
    const currentUser = this.props.currentUser;
    return (<div>
      <UserProfile currentUser={currentUser}/>
      <AppHeader/>
    </div>)
  }
}

export default App;
