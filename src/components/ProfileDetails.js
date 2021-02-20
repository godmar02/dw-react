import React from 'react';

function ProfileDetails(props) {
    return (<div className="profDetails" style={{
        "display" : "none"
      }}>
      <div>Google Account</div>
      <div id="userName">{props.UserName}</div>
      <div id="userEmail">{props.UserEmail}</div>
    </div>);
}

export default ProfileDetails;
