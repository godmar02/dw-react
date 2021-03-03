import React, {useState, useMemo} from 'react';
import ProfilePicture from 'components/profile/ProfilePicture';
import ProfileDetails from 'components/profile/ProfileDetails';
import ProfileState from 'components/contexts/ProfileState';

function UserProfile() {

  const [show, setShow] = useState(false);

  const ctx = useMemo(() => ({show, setShow}), [show]); //Memo-ised state for performance

  return (<ProfileState.Provider value={ctx}>
    <div>
      <ProfilePicture/> {
        show
          ? <ProfileDetails/>
          : null
      }
    </div>
  </ProfileState.Provider>);
}

export default UserProfile;
