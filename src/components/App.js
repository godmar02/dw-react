import React, {useState, useEffect} from 'react';
import * as FirestoreService from '../services/firebase';

function App() {

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();

  // Use an effect to authenticate user
  useEffect(() => {
    FirestoreService.signInWithGoogle().then(userCredential => {
      setUserId(userCredential.user.uid);
    }).catch(() => setError('google-auth-failed'));
  });

  return (<div>AUTHENTICATED</div>);
}

export default App;
