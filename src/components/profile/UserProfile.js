import React, {useState} from 'react';
import ProfilePicture from 'components/profilePicture';
import ProfileDetails from 'components/profileDetails';

function UserProfile(props) {

  const [show, setShow] = useState(false);

  return (<div>
    <ProfilePicture currentUser={props.currentUser}/>
      {show
        ? <ProfileDetails currentUser={props.currentUser}/>
        : null
      }
  </div>);
}

export default UserProfile;
