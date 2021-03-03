import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

export default function CharacterLevel() {

  const {character, setCharacter}= useContext(CharacterState);

  return (

            <TextField
              type="number"
              variant="outlined"
              label="Level"
              min={1}

              name="level"
              value={character.level || ''}
              onChange={event => setCharacter(character => ({...character,level: event.target.value}))}/>
          );
}
