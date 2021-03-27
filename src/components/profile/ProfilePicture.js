import React, { useContext } from 'react';
import AuthState from 'components/contexts/AuthState';
import ProfileState from 'components/contexts/ProfileState';
import Avatar from '@material-ui/core/Avatar';

export default function ProfilePicture() {
  const { currentUser } = useContext(AuthState);
  const { show, setShow } = useContext(ProfileState);
  function toggleSetShow() {
    setShow(!show);
  }

  return (
    <Avatar
      src={currentUser.photoURL}
      alt='Google Profile'
      onClick={() => toggleSetShow()}
    />
  );
}
