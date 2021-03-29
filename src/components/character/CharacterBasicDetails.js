import React, { useContext } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CharacterState from 'components/contexts/CharacterState';
import { class_details } from 'data/classDetails';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  smallTextField: {
    width: 120,
  },
});

export default function CharacterBasicDetails() {
  const { character, setCharacter } = useContext(CharacterState);
  const classes = useStyles();

  const dwc = character.dw_class;
  const alig = character.alignment;
  function alignmentAttribute() {
    if (character.dw_class && character.alignment) {
      return class_details[dwc].alignments.find((x) => x.alignment === alig)
        .attribute;
    } else {
      return '';
    }
  }

  function handleCharacterChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter((character) => ({ ...character, [name]: value }));
  }

  function suggestedLook() {
    if (character.dw_class) {
      let dwc = character.dw_class;
      return class_details[dwc].suggested_look;
    } else {
      return '';
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: 110, fontWeight: 'bold' }}>
                FULL NAME
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  placeholder="Your character's full name, titles and all"
                  value={character.full_name}
                  name='full_name'
                  onChange={handleCharacterChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>BACKSTORY</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  placeholder="Describe your character's backstory and anything else about your characters identity here"
                  value={character.backstory}
                  name='backstory'
                  onChange={handleCharacterChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>LOOK</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  placeholder={suggestedLook()}
                  name='look'
                  value={character.look}
                  onChange={handleCharacterChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>CLASS</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  variant='outlined'
                  name='dwClass'
                  value={character.dw_class}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ width: 110, fontWeight: 'bold' }}>
                RACE
              </TableCell>
              <TableCell style={{ width: 110 }}>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  variant='outlined'
                  name='race'
                  value={character.race}
                />
              </TableCell>
              <TableCell>
                <p>{character.race_move}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>ALIGNMENT</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  variant='outlined'
                  name='alignment'
                  value={character.alignment}
                />
              </TableCell>
              <TableCell>
                <p>{alignmentAttribute()}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
