import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

export default function CharacterXP() {

  const {character, setCharacter}= useContext(CharacterState);

  // Total Load
  const calcMaxXp = () => {
    if (character.level) {
      return ("/ " + (parseInt(character.level,10) + 7));
    } else {
      return ('');
    }
  };

  return (<>
            <TextField
              type="number"
              variant="outlined"
              label="XP"
              min={0}
              name="xp"
              value={character.xp || ''}
              onChange={event => setCharacter(character => ({...character,xp: event.target.value}))}/>
            <TextField
              variant="outlined"
              label="Max XP"
              name="maxXp"
              InputProps={{
                readOnly: true,
              }}
              value={calcMaxXp()} />
            </>);
}
