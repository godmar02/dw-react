import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import * as FirebaseService from 'services/firebase';
import ProfileState from 'components/contexts/ProfileState';
import {Button} from '@material-ui/core';

function ProfileDetails() {

  const [currentUser] = useContext(AuthState);
  const [show,setShow] = useContext(ProfileState);
  const toggleSetShow = () => setShow(!show);

    return (
      <div>
        <div>Google Account</div>
        <div>{currentUser.displayName}</div>
        <div>{currentUser.email}</div>
        <Button variant="contained" color="primary" onClick={() => FirebaseService.auth.signOut()}>LOG OUT</Button>
      </div>
    );
}

export default ProfileDetails;
