import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { useParams } from "react-router";
import CharacterState from './contexts/CharacterState';

function CharacterSheetHeader() {

  // Definitions for state
  const [character] = useContext(CharacterState);

  // retrieve URL parameters for usage
  const { campaignURL } = useParams();

  return (
    <div>
      <Link to="/dw-react">Home</Link> >
      <Link to={"/dw-react/" + campaignURL}> {campaignURL}</Link> >
      <p> {character.charaName}</p>
      <h1>{character.charaName}</h1>
      <p>{character.charaFullName}</p>
    </div>);
}

export default CharacterSheetHeader;
