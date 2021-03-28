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
  Tooltip,
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
    maxWidth: 250,
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

function Row(props) {
  const { item } = props;
  const { index } = props;
  const classes = useStyles();
  const [openRow, setOpenRow] = useState(false);
  const { character, setCharacter } = useContext(CharacterState);

  const updateItem = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newItems = [...character.items]; // copying the old array
    newItems[index] = { ...character.items[index], [name]: value }; // replace value
    setCharacter((character) => ({ ...character, items: newItems })); // set array back
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

  const deleteItem = (index) => {
    const newItems = [...character.items]; // copying the old array
    newItems.splice(index, 1); // remove item from array
    setCharacter((character) => ({ ...character, items: newItems })); // set array back
  };

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpenRow(!openRow)}>
            {openRow ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            name={'item_checkbox' + index}
            checked={!!item.checkbox}
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
            value={item.name}
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
            inputProps={{
              style: { textAlign: 'center' },
              min: 0,
            }}
            name='uses'
            value={item.uses}
            onChange={(event) => updateItem(event, index)}
          />
        </TableCell>
        <TableCell>
          <FormControl className={classes.formControl} fullWidth>
            <Select
              multiple
              value={item.tags}
              name='tags'
              onChange={(event) => updateItem(event, index)}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value, index) => (
                    <Chip key={index} label={value} className={classes.chip} />
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
        <TableCell>
          <TextField
            type='number'
            fullWidth
            size='small'
            variant='outlined'
            inputProps={{
              style: { textAlign: 'center' },
              min: 0,
            }}
            value={item.weight}
            name='weight'
            onChange={(event) => updateItem(event, index)}
          />
        </TableCell>
        <TableCell>
          <Tooltip title='Delete'>
            <IconButton aria-label='delete' onClick={() => deleteItem(index)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' style={{ width: 40 }}>
                      TYPE
                    </TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell align='center' style={{ width: 65 }}>
                      COST
                    </TableCell>
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
                        value={item.type}
                        name='type'
                        onChange={(event) => updateItem(event, index)}>
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
                      value={item.description}
                      name='description'
                      onChange={(event) => updateItem(event, index)}
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <TextField
                      type='number'
                      fullWidth
                      size='small'
                      variant='outlined'
                      inputProps={{
                        style: { textAlign: 'center' },
                        min: 0,
                      }}
                      name='cost'
                      value={item.cost}
                      onChange={(event) => updateItem(event, index)}
                    />
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function CharacterGear() {
  const classes = useStyles();
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  function totalLoad() {
    if (character.items) {
      return character.items.reduce(
        (totalLoad, data) => totalLoad + parseInt(data.weight || 0, 10),
        0
      );
    } else {
      return '';
    }
  }

  function maxLoad() {
    if (
      character.dw_class &&
      character.abilities.find((x) => x.category === 'STR').score
    ) {
      let str = character.abilities.find((x) => x.category === 'STR');
      let baseModifier;
      let strAfflicted = str.afflicted;
      let strScore = parseInt(str.score, 10);
      let afflicted;

      if ([1, 2, 3].indexOf(strScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(strScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(strScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(strScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(strScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(strScore) > -1) {
        baseModifier = 2;
      } else if (strScore === 18) {
        baseModifier = 3;
      }

      /*-1 if afflicted*/
      if (strAfflicted === false) {
        afflicted = 0;
      } else {
        afflicted = 1;
      }

      let modifier = baseModifier - afflicted;

      return class_details[dwc].base_load + modifier;
    } else {
      return '';
    }
  }

  function validateLoad() {
    if (totalLoad() > maxLoad()) {
      return true;
    } else {
      return false;
    }
  }

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <>
      <AddItemState.Provider value={ctx}>
        <AddItem />
      </AddItemState.Provider>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: 20 }}></TableCell>
              <TableCell align='center' style={{ width: 40 }}>
                EQUIPPED
              </TableCell>
              <TableCell align='center'>NAME</TableCell>
              <TableCell align='center' style={{ width: 65 }}>
                USES
              </TableCell>
              <TableCell align='center' style={{ width: 180 }}>
                TAGS
              </TableCell>
              <TableCell align='center' style={{ width: 80 }}>
                WEIGHT
              </TableCell>
              <TableCell style={{ width: 40 }}>
                <Tooltip title='Add Gear'>
                  <IconButton aria-label='add' onClick={handleClickOpen}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {character.items &&
              character.items.map((item, index) => (
                <Row key={index} index={index} item={item} />
              ))}
            <TableRow>
              <TableCell align='right' colSpan='5'>
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
                  inputProps={{
                    style: { textAlign: 'center' },
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
