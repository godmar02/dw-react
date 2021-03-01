import React, {useState} from 'react';
import ProfilePicture from 'components/profile/ProfilePicture';
import ProfileDetails from 'components/profile/ProfileDetails';
import ProfileState from 'components/contexts/ProfileState';

function UserProfile() {

  const [show, setShow] = useState(false);

  return (
<ProfileState.Provider value={[show, setShow]}>
    <div>
    <ProfilePicture/>
    {
      show
        ? <ProfileDetails/>
        : null
    }
  </div>
</ProfileState.Provider>);
}

export default UserProfile;
