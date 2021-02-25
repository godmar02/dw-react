import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function CharacterSheetHeader() {

  // Definitions for state
  const [character] = useContext(CharacterState);

  return (
    <div>
      <h1>{character.charaName}</h1>
    </div>);
}

export default CharacterSheetHeader;
