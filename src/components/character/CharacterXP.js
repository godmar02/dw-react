import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { InputAdornment, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 100,
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
  const maxXp = () => {
    if (character.level) {
      return parseInt(character.level, 10) + 7;
    } else {
      return '';
    }
  };

  // Validate XP
  const validateXp = () => {
    if (parseInt(character.xp, 10) > maxXp()) {
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
        label='XP'
        error={validateXp()}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>{' / ' + maxXp()}</InputAdornment>
          ),
        }}
        min={0}
        size='small'
        className={classes.textField}
        name='xp'
        value={character.xp || ''}
        onChange={handleCharacterChange}
      />
    </>
  );
}
