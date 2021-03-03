import React, {useState, useEffect, useMemo} from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import {Button} from '@material-ui/core';

function Index() {

  const [currentUser, setCurrentUser] = useState(null);

  const ctx = useMemo(() => ({currentUser}), [currentUser]);

  useEffect(() => {
    const unsubscribe = FirebaseService.auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    });
    return unsubscribe;
  }, [])

  return (<AuthState.Provider value={ctx}>
    {
      currentUser
        ? <App/>
        : <Button variant="contained" color="primary" onClick={FirebaseService.SignInWithGoogle}>SIGN IN WITH GOOGLE</Button>
    }
  </AuthState.Provider>);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index/>, rootElement);
