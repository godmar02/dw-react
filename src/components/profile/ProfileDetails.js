import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import * as FirebaseService from 'services/firebase';
import ProfileState from 'components/contexts/ProfileState';

function ProfileDetails() {

  const [currentUser] = useContext(AuthState);
  const [show,setShow] = useContext(ProfileState);
  const toggleSetShow = () => setShow(!show);

    return (
      <div className="profDetails">
        <div>Google Account</div>
        <div id="userName">{currentUser.displayName}</div>
        <div id="userEmail">{currentUser.email}</div>
        <button onClick={() => FirebaseService.auth.signOut()}>LOG OUT</button>
      </div>
    );
}

export default ProfileDetails;
