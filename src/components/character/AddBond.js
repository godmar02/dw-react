import React, { useContext, useState } from 'react';
import AddBondState from 'components/contexts/AddBondState';
import CharacterState from 'components/contexts/CharacterState';
import { class_details } from 'data/classDetails';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function AddBond() {
  const classes = useStyles();
  const { open, setOpen } = useContext(AddBondState);
  const { character, setCharacter } = useContext(CharacterState);
  const [bond, setBond] = useState('');
  const dwc = character.dw_class;

  const handleCancel = () => {
    setBond('');
    setOpen(false);
  };

  const handleSave = () => {
    addBond();
    setBond('');
    setOpen(false);
  };

  const addBond = () => {
    const newBonds = [...character.bonds, bond]; // copying the old array and adding new bond depending upon selection
    setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add new bond</DialogTitle>{' '}
      <DialogContent>
        <DialogContentText>
          Choose a suggested bond to add. If you wish to create your own choose
          'CUSTOM'.
        </DialogContentText>
        <FormControl component='fieldset' className={classes.formControl}>
          <RadioGroup
            aria-label='bond'
            name='bond'
            value={bond}
            onChange={(event) => setBond(event.target.value)}>
            <FormControlLabel value='' control={<Radio />} label='CUSTOM' />
            {character.dw_class &&
              class_details[dwc].suggested_bonds.map((data, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={data}
                    control={<Radio />}
                    label={data}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Add Bond
        </Button>
      </DialogActions>
    </Dialog>
  );
}
