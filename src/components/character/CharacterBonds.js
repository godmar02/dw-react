import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { Add, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: 650,
  },
}));

export default function CharacterBonds() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);

  // State manipulation
  const updateBond = (index) => (e) => {
    let newBonds = [...character.bonds]; // copying the old array
    newBonds[index] = { ...character.bonds[index], bond: e.target.value }; // replace value
    setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
  };

  // Delete rows in the table
  const deleteBondRow = (index) => {
    const newBonds = [...character.bonds]; // copying the old array
    if (character.bonds.length !== 1) {
      //don't delete last row
      newBonds.splice(index, 1); // remove item from array
      setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
    } else {
      alert('Cannot delete final row');
    }
  };

  // Add rows in the table
  const addBondsRow = () => {
    const newBonds = [...character.bonds, { bond: '' }]; // copying the old array and adding blank item
    setCharacter((character) => ({ ...character, bonds: newBonds })); // set array back
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Bond</TableCell>
            <TableCell>
              <IconButton aria-label='add' onClick={() => addBondsRow()}>
                <Add />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
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
                      placeholder='Add 2-3 bonds here'
                      value={bond}
                      name={'bond' + index}
                      onChange={updateBond(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label='delete'
                      onClick={() => deleteBondRow(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <tfoot />
      </Table>
    </TableContainer>
  );
}
