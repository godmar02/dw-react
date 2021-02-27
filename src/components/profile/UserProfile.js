import React, {useState} from 'react';
import ProfilePicture from 'components/profile/ProfilePicture';
import ProfileDetails from 'components/profile/ProfileDetails';

function UserProfile(props) {

  const [show, setShow] = useState(false);

  return (<div>
    <ProfilePicture currentUser={props.currentUser}/>
    {
      show
        ? <ProfileDetails currentUser={props.currentUser}/>
        : null
    }
  </div>);
}

export default UserProfile;
