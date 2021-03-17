import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Breadcrumbs } from '@material-ui/core';
import CharacterState from 'components/contexts/CharacterState';
import { class_details } from 'data/classDetails';

export default function CharacterSheetHeader() {
  const { campaignURL, characterURL } = useParams();
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;
  const alig = character.alignment;
  const alignmentAttribute = () => {
    if (character.dw_class && character.alignment) {
      return class_details[dwc].alignments.find((x) => x.alignment === alig)
        .attribute;
    } else {
      return '';
    }
  };

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/dw-react'>Home</Link>
        <Link to={'/dw-react/' + campaignURL}>{campaignURL}</Link>
        <p>{characterURL}</p>
      </Breadcrumbs>
      <h1>{characterURL}</h1>
      <p>{character.dw_class}</p>
      <p>
        Race: {character.race} - {character.race_move}
      </p>
      <p>
        Alignment: {character.alignment} - {alignmentAttribute()}
      </p>
    </>
  );
}
