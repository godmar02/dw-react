import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

export default function CharacterArmour() {

  const {character, setCharacter} = useContext(CharacterState);

  const handleCharacterChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter(character => ({...character,[name]: value}))
  };

  return (
            <TextField
              type="number"
              variant="outlined"
              label="Armour"
              min={0}
              name="armour"
              value={character.armour || ''}
              onChange={handleCharacterChange}/>
  );
}
