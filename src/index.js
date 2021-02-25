import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.css';
import App from './components/App';
import * as FirebaseService from './services/firebase';

export const AuthContext = React.createContext(null);

class Index extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = FirebaseService.auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <>
        {
          this.state.currentUser ?
            (<div>
              <App currentUser={this.state.currentUser} />
              <button onClick={() => FirebaseService.auth.signOut()}>LOG OUT</button>
            </div>
            ) :
            <button onClick={FirebaseService.SignInWithGoogle}>SIGN IN WITH GOOGLE</button>
        }
      </>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
