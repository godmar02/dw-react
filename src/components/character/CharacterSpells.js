import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { Add, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
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
import { class_details } from 'data/classDetails';

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
  const dwc = character.dw_class;

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
      if (dwc === 'Cleric') {
        return character.spells.reduce(
          (totalSpells, data) => totalSpells + parseInt(data.level || 0, 10),
          0
        );
      } else if (dwc === 'Wizard') {
        return character.spells
          .filter((x) => x.prepared === true)
          .reduce(
            (totalSpells, data) => totalSpells + parseInt(data.level || 0, 10),
            0
          );
      }
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

  function commune() {
    //Delete any non-rotes moves, user can select new moves to add
    let newSpells = [...character.spells]; // copying the old array
    newSpells = newSpells.filter((x) => parseInt(x.level, 10) === 0);
    setCharacter((character) => ({
      ...character,
      spells: newSpells,
    })); // set array back
  }

  function prepareSpells() {
    //Unprepare any non-cantrips
    let newSpells = [...character.spells]; // copying the old array
    newSpells = newSpells.map((x) => {
      if (parseInt(x.level, 10) !== 0) {
        x.prepared = false;
      }
      return x;
    });
    setCharacter((character) => ({
      ...character,
      spells: newSpells,
    })); // set array back
  }

  function handleClickOpen() {
    setOpen(true);
  }

  //TODO ADD SCHOOL / ONGOING
  return (
    <>
      {dwc === 'Cleric' || dwc === 'Wizard' ? (
        <>
          <AddSpellState.Provider value={ctx}>
            <AddSpell />
          </AddSpellState.Provider>
          <TableContainer component={Paper}>
            <Table className={classes.table} size='small'>
              <TableHead>
                <TableRow>
                  {dwc === 'Wizard' ? (
                    <TableCell align='center' style={{ width: 40 }}>
                      PREPARED
                    </TableCell>
                  ) : null}
                  <TableCell align='center' style={{ width: 40 }}>
                    FORGOTTEN
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
                        {dwc === 'Wizard' ? (
                          <TableCell align='center' style={{ width: 20 }}>
                            <Checkbox
                              name='prepared'
                              checked={!!spell.prepared}
                              onChange={(event) =>
                                updateSpellCheckbox(event, index)
                              }
                              color='primary'
                              disabled={spell.level == 0}
                            />
                          </TableCell>
                        ) : null}
                        <TableCell align='center' style={{ width: 20 }}>
                          <Checkbox
                            name='forgotten'
                            checked={!!spell.forgotten}
                            onChange={(event) =>
                              updateSpellCheckbox(event, index)
                            }
                            color='primary'
                          />
                        </TableCell>
                        <TableCell align='center'>
                          <p>{spell.name}</p>
                        </TableCell>
                        <TableCell>
                          <p>{spell.description}</p>
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            type='number'
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
                          {spell.level === 1000 ? (
                            <Tooltip title='Delete'>
                              <IconButton
                                aria-label='delete'
                                onClick={() => deleteSpellRow(index)}>
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                <TableRow>
                  {dwc === 'Wizard' ? (
                    <TableCell align='right' colSpan='4'>
                      PREPARED SPELLS
                    </TableCell>
                  ) : (
                    <TableCell align='right' colSpan='3'>
                      PREPARED SPELLS
                    </TableCell>
                  )}
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
            {dwc === 'Cleric' ? (
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={() => commune()}>
                COMMUNE
              </Button>
            ) : (
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={() => prepareSpells()}>
                PREPARE SPELLS
              </Button>
            )}
          </TableContainer>
        </>
      ) : null}
    </>
  );
}
