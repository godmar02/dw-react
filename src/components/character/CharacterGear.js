import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import AddItemState from 'components/contexts/AddItemState';
import AddItem from 'components/character/AddItem';
import { class_details } from 'data/classDetails';
import { itemTypes } from 'data/itemTypes';
import { itemTags } from 'data/itemTags';
import {
  Box,
  Chip,
  Checkbox,
  Collapse,
  FormControl,
  IconButton,
  Input,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Add,
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  table: {
    minWidth: 650,
  },
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CharacterGear() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);
  const dwc = character.dw_class;
  const [open, setOpen] = useState(false);
  const [openRow, setOpenRow] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  const totalLoad = () => {
    if (character.items) {
      return character.items.reduce(
        (totalLoad, data) => totalLoad + parseInt(data.weight || 0, 10),
        0
      );
    } else {
      return '';
    }
  };

  const maxLoad = () => {
    if (
      character.dw_class &&
      character.abilities.find((x) => x.category === 'STR').score &&
      character.abilities.find((x) => x.category === 'STR').affliction
    ) {
      let str = character.abilities.find((x) => x.category === 'STR');
      let baseModifier;
      let abilityAffliction = str.affliction;
      let abilityScore = parseInt(str.score, 10);
      let afflicted;

      if ([1, 2, 3].indexOf(abilityScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(abilityScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(abilityScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(abilityScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(abilityScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(abilityScore) > -1) {
        baseModifier = 2;
      } else if (abilityScore === 18) {
        baseModifier = 3;
      }

      /*-1 if afflicted*/
      if (abilityAffliction === 'Unafflicted') {
        afflicted = 0;
      } else {
        afflicted = 1;
      }

      let modifier = baseModifier - afflicted;

      return class_details[dwc].base_load + modifier;
    } else {
      return '';
    }
  };

  const validateLoad = () => {
    if (totalLoad() > maxLoad()) {
      return true;
    } else {
      return false;
    }
  };

  const updateItem = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newItems = [...character.items]; // copying the old array
    newItems[index] = { ...character.items[index], [name]: value }; // replace value
    setCharacter((character) => ({ ...character, items: newItems })); // set array back
  };

  const deleteItem = (index) => {
    const newItems = [...character.items]; // copying the old array
    if (character.items.length !== 1) {
      //don't delete last row
      newItems.splice(index, 1); // remove item from array
      setCharacter((character) => ({ ...character, items: newItems })); // set array back
    } else {
      alert('Cannot delete final row');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const updateItemCheckbox = (index) => (e) => {
    let newItems = [...character.items]; // copying the old array
    newItems[index] = {
      ...character.items[index],
      checkbox: e.target.checked,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      items: newItems,
    })); // set array back
  };

  return (
    <>
      <AddItemState.Provider value={ctx}>
        <AddItem />
      </AddItemState.Provider>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>EQUIPPED</TableCell>
              <TableCell align='center'>NAME</TableCell>
              <TableCell align='center'>AMOUR</TableCell>
              <TableCell align='center'>USES</TableCell>
              <TableCell align='center'>WEIGHT</TableCell>
              <TableCell>
                <IconButton aria-label='add' onClick={handleClickOpen}>
                  <Add />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {character.items &&
              character.items.map((items, index) => {
                return (
                  <>
                    <TableRow key={index} className={classes.root}>
                      <TableCell>
                        <IconButton
                          aria-label='expand row'
                          size='small'
                          onClick={() => setOpenRow(!openRow)}>
                          {openRow ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          name={'item_checkbox' + index}
                          checked={!!items.checkbox}
                          onChange={updateItemCheckbox(index)}
                          color='primary'
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size='small'
                          variant='outlined'
                          aria-label='empty textarea'
                          value={items.name}
                          name='name'
                          onChange={(event) => updateItem(event, index)}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <TextField
                          type='number'
                          fullWidth
                          size='small'
                          variant='outlined'
                          min={0}
                          name='uses'
                          value={items.uses}
                          onChange={(event) => updateItem(event, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type='number'
                          fullWidth
                          size='small'
                          variant='outlined'
                          min={0}
                          value={items.weight}
                          name='weight'
                          onChange={(event) => updateItem(event, index)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label='delete'
                          onClick={() => deleteItem(index)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}>
                        <Collapse in={openRow} timeout='auto' unmountOnExit>
                          <Box margin={1}>
                            <Table size='small' aria-label='purchases'>
                              <TableHead>
                                <TableRow>
                                  <TableCell align='center'>TYPE</TableCell>
                                  <TableCell align='center'>
                                    DESCRIPTION
                                  </TableCell>
                                  <TableCell align='center'>COST</TableCell>
                                  <TableCell align='center'>TAGS</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableCell align='center'>
                                  <FormControl
                                    variant='outlined'
                                    size='small'
                                    className={classes.formControl}>
                                    <Select
                                      tabIndex={-1}
                                      value={items.type}
                                      name='type'
                                      onChange={(event) =>
                                        updateItem(event, index)
                                      }>
                                      {itemTypes.map((type, index) => (
                                        <MenuItem key={index} value={type}>
                                          {type}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    multiline
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    aria-label='empty textarea'
                                    value={items.description}
                                    name='description'
                                    onChange={(event) =>
                                      updateItem(event, index)
                                    }
                                  />
                                </TableCell>
                                <TableCell align='center'>
                                  <TextField
                                    type='number'
                                    fullWidth
                                    size='small'
                                    variant='outlined'
                                    min={0}
                                    name='cost'
                                    value={items.cost}
                                    onChange={(event) =>
                                      updateItem(event, index)
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <FormControl className={classes.formControl}>
                                    <Select
                                      multiple
                                      value={items.tags}
                                      name='tags'
                                      onChange={(event) =>
                                        updateItem(event, index)
                                      }
                                      input={<Input />}
                                      renderValue={(selected) => (
                                        <div className={classes.chips}>
                                          {selected.map((value, index) => (
                                            <Chip
                                              key={index}
                                              label={value}
                                              className={classes.chip}
                                            />
                                          ))}
                                        </div>
                                      )}
                                      MenuProps={MenuProps}>
                                      {itemTags.map((name, index) => (
                                        <MenuItem key={index} value={name}>
                                          {name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </TableCell>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            <TableRow>
              <TableCell align='right' colSpan='4'>
                LOAD
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  error={validateLoad()}
                  size='small'
                  variant='outlined'
                  name='totalLoad'
                  InputProps={{
                    readOnly: true,
                  }}
                  value={totalLoad() + ' / ' + maxLoad()}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
