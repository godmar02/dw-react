import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { Add, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@material-ui/core';
import AddSpellState from 'components/contexts/AddSpellState';
import AddSpell from 'components/character/AddSpell';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function CharacterSpells() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  // State manipulation
  const updateSpellCheckbox = (event, index) => {
    const target = event.target;
    const name = target.name;
    const checked = target.checked;
    let newSpells = [...character.spells]; // copying the old array
    newSpells[index] = {
      ...character.spells[index],
      [name]: checked,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      spells: newSpells,
    })); // set array back
  };

  const updateSpell = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let newSpells = [...character.spells]; // copying the old array
    newSpells[index] = { ...character.spells[index], [name]: value }; // replace value
    setCharacter((character) => ({ ...character, spells: newSpells })); // set array back
  };

  // Delete rows in the table
  const deleteSpellRow = (index) => {
    const newSpells = [...character.spells]; // copying the old array
    newSpells.splice(index, 1); // remove item from array
    setCharacter((character) => ({
      ...character,
      spells: newSpells,
    })); // set array back
  };

  function totalPreparedSpells() {
    if (character.spells) {
      return character.spells
        .filter((x) => x.prepared === true)
        .reduce(
          (totalSpells, data) => totalSpells + parseInt(data.level || 0, 10),
          0
        );
    } else {
      return '';
    }
  }

  function maxSpells() {
    return parseInt(character.level, 10) + 1;
  }

  function validatePreparedSpells() {
    if (totalPreparedSpells() > maxSpells()) {
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
      <AddSpellState.Provider value={ctx}>
        <AddSpell />
      </AddSpellState.Provider>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center' style={{ width: 40 }}>
                PREPARED
              </TableCell>
              <TableCell align='center' style={{ width: 40 }}>
                ONGOING
              </TableCell>
              <TableCell align='center' style={{ width: 140 }}>
                NAME
              </TableCell>
              <TableCell align='center'>DESCRIPTION</TableCell>
              <TableCell align='center' style={{ width: 65 }}>
                LEVEL
              </TableCell>
              <TableCell align='center'>
                <Tooltip title='Add Spell'>
                  <IconButton aria-label='add' onClick={handleClickOpen}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {character.spells &&
              character.spells.map((spell, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell style={{ width: 20 }}>
                      <Checkbox
                        name='prepared'
                        checked={!!spell.prepared}
                        onChange={(event) => updateSpellCheckbox(index)}
                        color='primary'
                      />
                    </TableCell>
                    <TableCell style={{ width: 20 }}>
                      <Checkbox
                        name='ongoing'
                        checked={!!spell.ongoing}
                        onChange={(event) => updateSpellCheckbox(index)}
                        color='primary'
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        multiline
                        fullWidth
                        size='small'
                        variant='outlined'
                        value={spell.name}
                        name='name'
                        onChange={(event) => updateSpell(event, index)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        multiline
                        fullWidth
                        size='small'
                        variant='outlined'
                        placeholder='Add spells details here'
                        value={spell.description}
                        name='description'
                        onChange={(event) => updateSpell(event, index)}
                      />
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
                        value={spell.level}
                        name='level'
                        onChange={(event) => updateSpell(event, index)}
                      />
                    </TableCell>
                    <TableCell style={{ width: 40 }}>
                      <Tooltip title='Delete'>
                        <IconButton
                          aria-label='delete'
                          onClick={() => deleteSpellRow(index)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}

            <TableRow>
              <TableCell align='right' colSpan='4'>
                TOTAL PREPARED SPELL LEVEL
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  error={validatePreparedSpells()}
                  size='small'
                  variant='outlined'
                  name='totalLoad'
                  InputProps={{
                    readOnly: true,
                  }}
                  inputProps={{
                    style: { textAlign: 'center' },
                  }}
                  value={totalPreparedSpells() + ' / ' + maxSpells()}
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
