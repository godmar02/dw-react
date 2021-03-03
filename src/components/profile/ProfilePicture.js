import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import ProfileState from 'components/contexts/ProfileState';
import Avatar from '@material-ui/core/Avatar';

function ProfilePicture() {

  const {currentUser} = useContext(AuthState);
  const {show, setShow} = useContext(ProfileState);
  const toggleSetShow = () => setShow(!show);

  return (<Avatar
    src={currentUser.photoURL}
    alt="Google Profile"
    onClick={() => toggleSetShow()}
    />);
}

export default ProfilePicture;
