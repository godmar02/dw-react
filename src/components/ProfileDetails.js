import React from 'react';
import '../index.css';

function ProfileDetails(props) {
    return (<div className="profDetails">
    <div>Google Account</div>
    <div id="userName">{props.currentUser.displayName}</div>
    <div id="userEmail">{props.currentUser.email}</div>
  </div>);
}

export default ProfileDetails;
