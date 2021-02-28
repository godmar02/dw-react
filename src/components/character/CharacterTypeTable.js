import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {races} from 'data/raceList';
import {dwClasses} from 'data/classList';
import {alignments} from 'data/classAlignments';
import {classDetails} from 'data/classDetails';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CharacterTypeTable() {

  const classes = useStyles();
  // State Variables
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
  <table style={{"width" : "100%"}} id="additionalInfoTable">
    <tbody>
      <tr>
        <th>
          <label style={{"width" : "25%"}} htmlFor="dwClass">CLASS</label>
        </th>
        <td style={{"width" : "25%"}}>
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
        </td>
        <td style={{"width" : "50%"}}/>
      </tr>
      <tr>
        <th>
          <label htmlFor="race">RACE</label>
        </th>
        <td>
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
        </td>
        <td>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            className="grey"
            name="raceAttributes"
            InputProps={{
              readOnly: true,
            }}
            value={raceAttributes()}/>
        </td>
      </tr>
      <tr>
        <th>
          <label htmlFor="alignment">ALIGNMENT</label>
        </th>
        <td>
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
        </td>
        <td>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            className="grey"
            name="alignmentAttribute"
            InputProps={{
              readOnly: true,
            }}
            value={alignmentAttributes()}/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default CharacterTypeTable;
