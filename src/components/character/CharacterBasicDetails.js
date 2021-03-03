import React, {useContext} from 'react';
import {Accordion,AccordionSummary,AccordionDetails,Paper,Table,TableBody,TableCell,TableContainer,TableRow,TextField} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import CharacterState from 'components/contexts/CharacterState';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CharacterBasicDetails() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  const classes = useStyles();

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}>Basic Details
      </AccordionSummary>
      <AccordionDetails>
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
            onChange={event => setCharacter(character => ({...character,fullName: event.target.value}))}/>
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
            onChange={event => setCharacter(character => ({...character,backstory: event.target.value}))}/>
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
            onChange={event => setCharacter(character => ({...character,look: event.target.value}))}/>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table></TableContainer></AccordionDetails>
</Accordion>
          );
}

export default CharacterBasicDetails;
