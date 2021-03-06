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
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Delete } from '@material-ui/icons';

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
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Bond</TableCell>
              <TableCell>
                <IconButton aria-label='add' onClick={handleClickOpen}>
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
                        placeholder='Add bonds detail here'
                        value={bond}
                        name={'bond' + index}
                        onChange={updateBond(index)}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label='delete'
                        onClick={() => deleteBond(index)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
