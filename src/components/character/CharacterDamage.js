import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';
import {TextField} from '@material-ui/core';

function CharacterDamage() {

  // State Variables
  const [character] = useContext(CharacterState);
  const dwc = character.dwClass;

  const damage = () => {
    if (character.dwClass) {
      return (classDetails.[dwc].damage);
    } else {
      return ('');
    }
  };

  return (
            <TextField
              variant="outlined"
              name="damage"
              label="Damage"
              InputProps={{
                readOnly: true,
              }}
              value={damage()}/>
  );
}
export default CharacterDamage;
