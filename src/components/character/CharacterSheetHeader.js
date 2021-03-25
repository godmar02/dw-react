import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Breadcrumbs } from '@material-ui/core';
import CharacterState from 'components/contexts/CharacterState';

export default function CharacterSheetHeader() {
  const { campaignURL, characterURL } = useParams();
  const { character } = useContext(CharacterState);

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/dw-react'>Home</Link>
        <Link to={'/dw-react/' + campaignURL}>{campaignURL}</Link>
        <p>{characterURL}</p>
      </Breadcrumbs>
      <h1>{characterURL}</h1>
      <p>
        {character.dw_class} - Level {character.level}
      </p>
    </>
  );
}
