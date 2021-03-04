import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';
import {TextField} from '@material-ui/core';

export default function CharacterHP() {

  const {character, setCharacter}= useContext(CharacterState);
  const dwc = character.dwClass;

  const maxHp = () => {
    if (character.dwClass && character.abilities) {
      return ("/ " + (classDetails.[dwc].baseHp + parseInt(character.abilities.find(x => x.category === 'CON').score ,10)));
    } else {
      return ('');
    }
  };

  const handleCharacterChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter(character => ({...character,[name]: value}))
  };

  return (<>
            <TextField
              type="number"
              variant="outlined"
              label="HP"
              min={0}
              name="hp"
              value={character.hp || ''}
              onChange={handleCharacterChange}/>
            <TextField
              variant="outlined"
              label="Max HP"
              name="maxHp"
              InputProps={{
                readOnly: true,
              }}
              value={maxHp()} />
            </>
  );
}
