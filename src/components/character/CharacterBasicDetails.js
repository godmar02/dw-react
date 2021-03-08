import React, {useContext} from 'react';
import {Paper,Table,TableBody,TableCell,TableContainer,TableRow,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CharacterState from 'components/contexts/CharacterState';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CharacterBasicDetails() {

  const {character, setCharacter} = useContext(CharacterState);
  const classes = useStyles();

  const handleCharacterChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter(character => ({...character,[name]: value}))
  };

  return (
        <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
    <TableBody>
      <TableRow>
        <th style={{"width" : "25%"}}>
          <label htmlFor="fullName">FULL NAME</label>
        </th>
        <TableCell>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Add your characters full name here"
            value={character.fullName}
            name="fullName"
            onChange={handleCharacterChange}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <th style={{"width" : "25%"}}>
          <label htmlFor="backstory">BACKSTORY</label>
        </th>
        <TableCell>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Describe your character's backstory and anything else about your characters identity here"
            value={character.backstory}
            name="backstory"
            onChange={handleCharacterChange}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <th style={{"width" : "25%"}}>
          <label htmlFor="look">LOOK</label>
        </th>
        <TableCell>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Describe your character's appearance here"
            name="look"
            value={character.look}
            onChange={handleCharacterChange}/>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table></TableContainer>
          );
}
