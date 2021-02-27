import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import 'custom.css';
import App from 'components/App';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';

function Index() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = FirebaseService.auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    });
    return unsubscribe;
  }, [])

  return (<AuthState.Provider value={[currentUser]}>
    {
      currentUser
        ? (<div>
          <App currentUser={currentUser}/>
          <button onClick={() => FirebaseService.auth.signOut()}>LOG OUT</button>
        </div>)
        : <button onClick={FirebaseService.SignInWithGoogle}>SIGN IN WITH GOOGLE</button>
    }
  </AuthState.Provider>);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index/>, rootElement);
