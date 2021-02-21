import React from 'react';

function ProfilePicture(props) {
    return (<img
    className="profPicture"
    id="userPicture"
    src={props.currentUser.photoURL}
    alt={props.currentUser.photoURL} />)
}

export default ProfilePicture;
