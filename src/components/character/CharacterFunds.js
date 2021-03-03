import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

export default function CharacterFunds() {

  const {character, setCharacter}= useContext(CharacterState);

  return (
            <TextField
              type="number"
              variant="outlined"
              name="funds"
              label="Funds"
              min={0}
              value={character.funds || ''}
              onChange={event => setCharacter(character => ({...character,funds: event.target.value}))}/>
  );
}
