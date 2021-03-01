import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {races} from 'data/raceList';
import {dwClasses} from 'data/classList';
import {alignments} from 'data/classAlignments';
import {classDetails} from 'data/classDetails';
import {Accordion,AccordionSummary,AccordionDetails,FormControl,MenuItem,Paper,Select,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

function CharacterType() {

  const classes = useStyles();
  const [character, setCharacter] = useContext(CharacterState);
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

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}>Character Type
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
  <Table className={classes.table} aria-label="simple table">
    <TableBody>
      <TableRow>
        <th>CLASS
        </th>
        <TableCell style={{"width" : "25%"}}>
          <FormControl variant="outlined" className={classes.formControl}>
          <Select
            tabIndex={-1}
            value={character.dwClass || "null"}
            onChange={event => {
              setCharacter(character => ({...character,dwClass: event.target.value}));
              setCharacter(character => ({...character,alignment: "null"}))}}>
            <MenuItem disabled value="null" hidden />
            {
              dwClasses.map((data, key) => {
                return (
                <MenuItem value={data} key={key}>
                  {data}
                </MenuItem>);
              })
            }
          </Select>
          </FormControl>
        </TableCell>
        <TableCell style={{"width" : "50%"}}/>
      </TableRow>
      <TableRow>
        <th>
          <label htmlFor="race">RACE</label>
        </th>
        <TableCell>
          <FormControl variant="outlined" className={classes.formControl}>
          <Select
            tabIndex={-1}
            value={character.race || "null"}
            name="race"
            onChange={event => setCharacter(character => ({...character,race: event.target.value}))}>
            <MenuItem disabled value="null" hidden />
            {
              races.map((data, key) => {
                return (
                <MenuItem value={data} key={key}>
                  {data}
                </MenuItem>);
              })
            }
          </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"

            name="raceAttributes"
            InputProps={{
              readOnly: true,
            }}
            value={raceAttributes()}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <th>
          <label htmlFor="alignment">ALIGNMENT</label>
        </th>
        <TableCell>
          <FormControl variant="outlined" className={classes.formControl}>
          <Select
            tabIndex={-1}
            value={character.alignment || "null"}
            name="alignment"
            onChange={event => setCharacter(character => ({...character,alignment: event.target.value}))}>
            <MenuItem disabled value="null" hidden />
            {
              character.dwClass && dwc && alignments.[dwc].map((data, key) => {
              return (
              <MenuItem value={data} key={key}>
                {data}
              </MenuItem>);})
            }
          </Select>
        </FormControl>
        </TableCell>
        <TableCell>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"

            name="alignmentAttribute"
            InputProps={{
              readOnly: true,
            }}
            value={alignmentAttributes()}/>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table></TableContainer>
</AccordionDetails>
</Accordion>
          );
}

export default CharacterType;
