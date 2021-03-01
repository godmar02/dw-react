import React from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import {Breadcrumbs} from '@material-ui/core';

function CharacterSheetHeader() {

  // retrieve URL parameters for usage
  const {campaignURL, characterURL} = useParams();

  return (
  <>
    <Breadcrumbs aria-label="breadcrumb">
      <Link to="/dw-react">Home</Link>
      <Link to={"/dw-react/" + campaignURL}>{campaignURL}</Link>
      <p>
        {characterURL}</p>
    </Breadcrumbs>
      <h1>Character: {characterURL}</h1>
    </>);
}

export default CharacterSheetHeader;
