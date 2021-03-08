import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 80,
    
    '& input': {
      textAlign: 'center'
    }
  }
}));

export default function CharacterFunds() {

  const {character, setCharacter}= useContext(CharacterState);
    const classes = useStyles();

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
              size="small"
              className={classes.textField}
              name="funds"
              label="Funds"
              min={0}
              value={character.funds || ''}
              onChange={handleCharacterChange}/>
  );
}
