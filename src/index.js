import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as FirestoreService from './services/firebase';

export const AuthContext = React.createContext(null);

//function Index() {
//  FirestoreService.SignInWithGoogle();
//  return (<App isLoggedIn={false}/>);
//}

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
              <div>
                <img src={this.state.currentUser.photoURL} alt={this.state.currentUser.photoURL}/>
              </div>
              <div>Name: {this.state.currentUser.displayName}</div>
              <div>Email: {this.state.currentUser.email}</div>
              <App currentUser={this.state.currentUser}/>

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
