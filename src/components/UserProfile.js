import React from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDetails from './ProfileDetails';

function UserProfile(props) {
  return (<div>
    <ProfilePicture/>
    <ProfileDetails/>
  </div>);
}

export default UserProfile;
