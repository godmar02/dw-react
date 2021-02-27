import React from 'react';

function ProfilePicture(props) {
  return (<img
    className="profPicture"
    id="userPicture"
    src={props.currentUser.photoURL}
    alt="Google Profile"/>);
}

export default ProfilePicture;
