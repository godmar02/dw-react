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
  const alignmentAttribute = () => {
    if (character.dw_class && character.alignment) {
      return class_details[dwc].alignments.find((x) => x.alignment === alig)
        .attribute;
    } else {
      return '';
    }
  };

  const handleCharacterChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setCharacter((character) => ({ ...character, [name]: value }));
  };

  const suggestedLook = () => {
    if (character.dw_class) {
      let dwc = character.dw_class;
      return class_details[dwc].suggested_look;
    } else {
      return '';
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size='small' aria-label='simple table'>
          <TableBody>
            <TableRow>
              <TableCell>FULL NAME</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  aria-label='empty textarea'
                  placeholder="Your character's full name, titles and all"
                  value={character.full_name}
                  name='full_name'
                  onChange={handleCharacterChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>BACKSTORY</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  aria-label='empty textarea'
                  placeholder="Describe your character's backstory and anything else about your characters identity here"
                  value={character.backstory}
                  name='backstory'
                  onChange={handleCharacterChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>LOOK</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  aria-label='empty textarea'
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
              <TableCell>CLASS</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  className={classes.smallTextField}
                  variant='outlined'
                  name='dwClass'
                  value={character.dw_class}
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RACE</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  className={classes.smallTextField}
                  variant='outlined'
                  name='race'
                  value={character.race}
                />
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  variant='outlined'
                  name='race_move'
                  value={character.race_move}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ALIGNMENT</TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  className={classes.smallTextField}
                  variant='outlined'
                  name='alignment'
                  value={character.alignment}
                />
              </TableCell>
              <TableCell>
                <TextField
                  multiline
                  fullWidth
                  readOnly
                  variant='outlined'
                  name='alignment_move'
                  value={alignmentAttribute()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
