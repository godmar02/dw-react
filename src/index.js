import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as FirestoreService from './services/firebase';

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
    this.unsubscribeFromAuth = FirestoreService.auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='user-info'>
        {
          this.state.currentUser ?
            (<div>
              <App currentUser={this.state.currentUser} />
              <button onClick={() => FirestoreService.auth.signOut()}>LOG OUT</button>
            </div>
            ) :
            <button onClick={FirestoreService.SignInWithGoogle}>SIGN IN WITH GOOGLE</button>
        }
      </div >
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
