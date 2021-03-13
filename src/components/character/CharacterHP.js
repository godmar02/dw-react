import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { class_details } from 'data/classDetails';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 80,

    '& input': {
      textAlign: 'center',
    },
    margin: 4,
  },
}));

export default function CharacterHP() {
  const { character, setCharacter } = useContext(CharacterState);
  const dwc = character.dw_class;
  const classes = useStyles();

  const maxHp = () => {
    if (character.dw_class && character.abilities) {
      return (
        class_details[dwc].base_hp +
        parseInt(
          character.abilities.find((x) => x.category === 'CON').score,
          10
        )
      );
    } else {
      return '';
    }
  };

  // Validate XP
  const validateHp = () => {
    if (parseInt(character.hp, 10) > maxHp()) {
      return true;
    } else {
      return false;
    }
  };

  const handleCharacterChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter((character) => ({ ...character, [name]: value }));
  };

  return (
    <>
      <TextField
        type='number'
        variant='outlined'
        label='HP'
        error={validateHp()}
        min={0}
        size='small'
        className={classes.textField}
        name='hp'
        value={character.hp || ''}
        onChange={handleCharacterChange}
      />
      <TextField
        variant='outlined'
        label='Max HP'
        size='small'
        className={classes.textField}
        name='maxHp'
        InputProps={{
          readOnly: true,
        }}
        value={'/ ' + maxHp()}
      />
    </>
  );
}
