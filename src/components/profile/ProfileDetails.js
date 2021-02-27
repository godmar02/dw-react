import React from 'react';

function ProfileDetails(props) {
    return (
      <div className="profDetails">
        <div>Google Account</div>
        <div id="userName">{props.currentUser.displayName}</div>
        <div id="userEmail">{props.currentUser.email}</div>
      </div>
    );
}

export default ProfileDetails;
