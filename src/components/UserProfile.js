import React, {useState} from 'react';
import ProfilePicture from './ProfilePicture';
import ProfileDetails from './ProfileDetails';

function UserProfile(props) {
  const [hidden, setHidden] = useState(true);
  return (<div>
    <ProfilePicture currentUser={props.currentUser}/>
    <ProfileDetails currentUser={props.currentUser}/>
  </div>);
}

export default UserProfile;
