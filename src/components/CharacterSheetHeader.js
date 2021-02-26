import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { useParams } from "react-router";
import CharacterState from './contexts/CharacterState';

function CharacterSheetHeader() {

  // Definitions for state
  const [character] = useContext(CharacterState);

  // retrieve URL parameters for usage
  const { campaignURL, characterURL } = useParams();

  return (
    <div>
      <Link to="/dw-react">Home</Link> >
      <Link to={"/dw-react/" + campaignURL}> {campaignURL}</Link> >
      <p> {characterURL}</p>
      <h1>{characterURL}</h1>
      <p>{character.charaFullName}</p>
    </div>);
}

export default CharacterSheetHeader;
