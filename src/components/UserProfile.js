import React from 'react';
import '../index.css';
import '../custom.css';
import ProfilePicture from './ProfilePicture';
import ProfileDetails from './ProfileDetails';

function UserProfile(props) {
  return (<div>
    <ProfilePicture currentUser={props.currentUser}/>
    <ProfileDetails currentUser={props.currentUser}/>
  </div>);
}

export default UserProfile;
