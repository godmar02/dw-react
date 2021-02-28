import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import * as FirebaseService from 'services/firebase';
import ProfileState from 'components/contexts/ProfileState';
import Button from '@material-ui/core/Button';

function ProfileDetails() {

  const [currentUser] = useContext(AuthState);
  const [show,setShow] = useContext(ProfileState);
  const toggleSetShow = () => setShow(!show);

    return (
      <div className="profDetails">
        <div>Google Account</div>
        <div id="userName">{currentUser.displayName}</div>
        <div id="userEmail">{currentUser.email}</div>
        <Button variant="contained" color="primary" onClick={() => FirebaseService.auth.signOut()}>LOG OUT</Button>
      </div>
    );
}

export default ProfileDetails;
