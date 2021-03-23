import React, { useContext, useState } from 'react';
import AddMoveState from 'components/contexts/AddMoveState';
import CharacterState from 'components/contexts/CharacterState';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { class_details } from 'data/classDetails';

export default function AddMove() {
  const { open, setOpen } = useContext(AddMoveState);
  const { character, setCharacter } = useContext(CharacterState);
  const [move, setMove] = useState('');
  const dwc = character.dw_class;

  const handleCancel = () => {
    setMove('');
    setOpen(false);
  };

  const handleSave = () => {
    addMove();
    setMove('');
    setOpen(false);
  };

  const addMove = () => {
    const newMove = class_details.moves.find((x) => x.name === move);
    if (newMove) {
      const newMoves = [...character.moves, newMove]; // copying the old array and adding new move depending upon selection
      setCharacter((character) => ({ ...character, moves: newMoves })); // set array back
    }
  };

  //TODO, MAKE THIS A RADIO SELECTION WITH DETAILS FOR DIFFERENT LEVELS
  //REPLACE EXISTING OPTION ON SELECTION

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add new move</DialogTitle>{' '}
      <DialogContent>
        <DialogContentText>Search for an move to add.</DialogContentText>
        <Autocomplete
          freeSolo
          onChange={(event, value) => setMove(value)}
          options={class_details[dwc].moves
            .filter((x) => x.level !== 'starting')
            .map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Moves'
              margin='normal'
              variant='outlined'
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Add Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}
