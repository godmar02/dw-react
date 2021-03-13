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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { items } from 'data/itemsList';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CampaignDetails() {
  const classes = useStyles();
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
    const newItems = [...character.items, newItem]; // copying the old array and adding new item depending upon selection
    setCharacter((character) => ({ ...character, items: newItems })); // set array back
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add new item</DialogTitle>{' '}
      <DialogContent>
        <DialogContentText>
          Select an item to add from the list. If you wish to create your own
          select '---CUSTOM---'.
        </DialogContentText>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Item</InputLabel>
          <Select
            label='Item'
            value={item}
            name='item'
            onChange={(event) => setItem(event.target.value)}>
            {items.map((data, key) => {
              return (
                <MenuItem value={data.name} key={key}>
                  {data.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
