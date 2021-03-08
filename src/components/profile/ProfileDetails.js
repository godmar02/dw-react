import React, {useContext} from 'react';
import AuthState from 'components/contexts/AuthState';
import * as FirebaseService from 'services/firebase';
import {Button} from '@material-ui/core';

export default function ProfileDetails() {

  const {currentUser} = useContext(AuthState);

  return (<div style={{
      "border" : "0",
      "WebkitBorderRadius" : "50%",
      "borderRadius" : "5px",
      "display" : "inline-block",
      "margin" : "0",
      "position" : "absolute",
      "top" : "50px",
      "right" : "20px",
      "color" : "#bdc1c6",
      "backgroundColor" : "rgba(60, 64, 67, 0.9)",
      "textAlign" : "left",
      "font" : "500 12px 'Roboto', arial, sans-serif",
      "letterSpacing" : "0.8px",
      "lineHeight" : "16px",
      "fontWeight" : "bold",
      "padding" : "8px 8px"
    }}>
    <div style={{
        "color" : "white"
      }}>Google Account</div>
    <div>{currentUser.displayName}</div>
    <div>{currentUser.email}</div>
    <Button variant="contained" color="primary" onClick={() => FirebaseService.auth.signOut()}>LOG OUT</Button>
  </div>);
}
