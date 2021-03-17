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
  },
}));

export default function CharacterDamage() {
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;
  const classes = useStyles();

  const damage = () => {
    if (character.dw_class) {
      return class_details[dwc].damage;
    } else {
      return '';
    }
  };

  return (
    <TextField
      variant='outlined'
      size='small'
      className={classes.textField}
      name='damage'
      label='Damage'
      InputProps={{
        readOnly: true,
      }}
      value={damage()}
    />
  );
}
