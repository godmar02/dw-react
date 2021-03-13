import React, { useContext, useState } from 'react';
import AddItemState from 'components/contexts/AddItemState';
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
import { items } from 'data/itemsList';

export default function CampaignDetails() {
  const { open, setOpen } = useContext(AddItemState);
  const { character, setCharacter } = useContext(CharacterState);
  const [item, setItem] = useState('');

  const handleCancel = () => {
    setItem('');
    setOpen(false);
  };

  const handleSave = () => {
    addItemRow();
    setItem('');
    setOpen(false);
  };

  // Add rows in the table
  const addItemRow = () => {
    const newItem = items.find((x) => x.name === item);
    if (newItem) {
      const newItems = [...character.items, newItem]; // copying the old array and adding new item depending upon selection
      setCharacter((character) => ({ ...character, items: newItems })); // set array back
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add new item</DialogTitle>{' '}
      <DialogContent>
        <DialogContentText>
          Search for an item to add. If you wish to create your own choose
          'CUSTOM'.
        </DialogContentText>
        <Autocomplete
          freeSolo
          onChange={(event, value) => setItem(value)}
          options={items.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Items'
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
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  );
}
