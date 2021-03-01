import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import * as FirebaseService from 'services/firebase';
import ProfileState from 'components/contexts/ProfileState';
import {Button} from '@material-ui/core';

function ProfileDetails() {

  const [currentUser] = useContext(AuthState);
  const [show,setShow] = useContext(ProfileState);
  const toggleSetShow = () => setShow(!show);

    return (
      <div style={{"border": "0",
      "-webkit-border-radius": "50%",
      "border-radius": "5px",
      "display": "inline-block",
      "margin": "0",
      "position": "absolute",
      "top": "50px",
      "right": "20px",
      "color": "#bdc1c6",
      "background-color": "rgba(60, 64, 67, 0.9)",
      "text-align": "left",
      "font": "500 12px 'Roboto', arial, sans-serif",
      "letter-spacing": "0.8px",
      "line-height": "16px",
      "font-weight": "bold",
      "padding": "8px 8px"}}>
        <div style={{"color": "white"}}>Google Account</div>
        <div>{currentUser.displayName}</div>
        <div>{currentUser.email}</div>
        <Button variant="contained" color="primary" onClick={() => FirebaseService.auth.signOut()}>LOG OUT</Button>
      </div>
    );
}

export default ProfileDetails;
