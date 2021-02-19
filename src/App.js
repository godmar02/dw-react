import React, { useState, useEffect } from 'react';
import * as FirestoreService from './services/firestore';

function App() {

  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();

  // Use an effect to authenticate user
  useEffect(() => {
    FirestoreService.authenticateGoogle().then(userCredential => {
      setUserId(userCredential.user.uid);
    })
    .catch(() => setError('anonymous-auth-failed'));
  });

  return (
    <div> </div>
  );
}

export default App;
