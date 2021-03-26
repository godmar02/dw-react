import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import AddBondState from 'components/contexts/AddBondState';
import AddBond from 'components/character/AddBond';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function CharacterBonds() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  const updateBond = (index) => (e) => {
    let newBonds = [...character.bonds]; // copying the old array
    newBonds[index] = e.target.value; // replace value
    setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
  };

  const deleteBond = (index) => {
    const newBonds = [...character.bonds]; // copying the old array
    //don't delete last row
    newBonds.splice(index, 1); // remove item from array
    setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AddBondState.Provider value={ctx}>
        <AddBond />
      </AddBondState.Provider>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small'>
          <TableBody>
            {character.bonds &&
              character.bonds.map((bond, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        multiline
                        fullWidth
                        variant='outlined'
                        aria-label='empty textarea'
                        placeholder='Add bond detail here'
                        value={bond}
                        name={'bond' + index}
                        onChange={updateBond(index)}
                      />
                    </TableCell>
                    <TableCell style={{ width: 40 }}>
                      <Tooltip title='Delete'>
                        <IconButton
                          aria-label='delete'
                          onClick={() => deleteBond(index)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <TableCell align='center' colSpan='2'>
                <Tooltip title='Add Bond'>
                  <IconButton aria-label='add' onClick={handleClickOpen}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
