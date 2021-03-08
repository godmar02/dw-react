import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {races} from 'data/raceList';
import {dwClasses} from 'data/classList';
import {alignments} from 'data/classAlignments';
import {classDetails} from 'data/classDetails';
import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 650
  }
}));

export default function CharacterType() {

  const classes = useStyles();
  const {character, setCharacter} = useContext(CharacterState);
  const dwc = character.dwClass;
  const alig = character.alignment;
  const race = character.race;

  const raceAttributes = () => {
    if (character.dwClass && character.race) {
      return (classDetails.[dwc].raceAttributes.[race]);
    } else {
      return ('');
    }
  };

  const alignmentAttributes = () => {
    if (character.dwClass && character.alignment) {
      return (classDetails.[dwc].alignmentAttributes.[alig]);
    } else {
      return ('');
    }
  };

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
              <th>CLASS
              </th>
              <TableCell style={{
                  "width" : "25%"
                }}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select tabIndex={-1} value={character.dwClass || "null"} name="class" onChange={event => {
                      handleCharacterChange(event);
                      setCharacter(character => ({...character, alignment: "null"}))
                    }}>
                    <MenuItem disabled="true" value="null" hidden="hidden"/> {
                      dwClasses.map((data, key) => {
                        return (<MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>);
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell style={{
                  "width" : "50%"
                }}/>
            </TableRow>
            <TableRow>
              <th>
                <label htmlFor="race">RACE</label>
              </th>
              <TableCell>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select tabIndex={-1} value={character.race || "null"} name="race" onChange={handleCharacterChange}>
                    <MenuItem disabled="true" value="null" hidden="hidden"/> {
                      races.map((data, key) => {
                        return (<MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>);
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField multiline fullwidth="true" variant="outlined" aria-label="empty textarea" name="raceAttributes" InputProps={{
                    readOnly: true
                  }} value={raceAttributes()}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <th>
                <label htmlFor="alignment">ALIGNMENT</label>
              </th>
              <TableCell>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select tabIndex={-1} value={character.alignment || "null"} name="alignment" onChange={handleCharacterChange}>
                    <MenuItem disabled="true" value="null" hidden="hidden"/> {
                      character.dwClass && dwc && alignments.[dwc].map((data, key) => {
                        return (<MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>);
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <TextField multiline fullwidth="true" variant="outlined" aria-label="empty textarea" name="alignmentAttribute" InputProps={{
                    readOnly: true
                  }} value={alignmentAttributes()}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>);
}
