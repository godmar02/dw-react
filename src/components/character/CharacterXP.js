import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
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

export default function CharacterXP() {
  const { character, setCharacter } = useContext(CharacterState);
  const classes = useStyles();

  // Total Load
  const calcMaxXp = () => {
    if (character.level) {
      return '/ ' + (parseInt(character.level, 10) + 7);
    } else {
      return '';
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
        label='XP'
        min={0}
        size='small'
        className={classes.textField}
        name='xp'
        value={character.xp || ''}
        onChange={handleCharacterChange}
      />
      <TextField
        variant='outlined'
        size='small'
        label='Max XP'
        className={classes.textField}
        name='maxXp'
        InputProps={{
          readOnly: true,
        }}
        value={calcMaxXp()}
      />
    </>
  );
}
