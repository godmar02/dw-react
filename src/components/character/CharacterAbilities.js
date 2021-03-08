import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {abilityAfflictions} from 'data/abilityAfflictions';
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
    width: 126,
    textAlign: 'center'
  },
  textField: {
    width: 126,
    '& input': {
      textAlign: 'center'
    }
  },
  textFieldBold: {
    width: 126,
    '& input': {
      textAlign: 'center',
      fontWeight: "bold",
      fontSize: 25
    },
  }
}));

export default function CharacterAbilities() {

  const classes = useStyles();
  const {character, setCharacter} = useContext(CharacterState);

  const updateAbilityScore = index => e => {
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {
      ...character.abilities[index],
      score: e.target.value
    }; // replace value
    setCharacter(character => ({
      ...character,
      abilities: newAbilities
    })); // set array back
  }

  const updateAbilityAffliction = index => e => {
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {
      ...character.abilities[index],
      affliction: e.target.value
    }; // replace value
    setCharacter(character => ({
      ...character,
      abilities: newAbilities
    })); // set array back
  }

  const abilityModifier = (abilityScore, abilityAffliction) => {

    if (abilityScore && abilityAffliction) {
      let baseModifier;
      let afflicted;

      abilityScore = parseInt(abilityScore, 10);

      if ([1, 2, 3].indexOf(abilityScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(abilityScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(abilityScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(abilityScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(abilityScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(abilityScore) > -1) {
        baseModifier = 2;
      } else if (abilityScore === 18) {
        baseModifier = 3;
      }

      /* -1 if afflicted */
      if (abilityAffliction === "Unafflicted") {
        afflicted = 0;
      } else {
        afflicted = 1;
      }

      let modifier = (baseModifier - afflicted);

      if (modifier > 0) {
        return ("[+" + modifier + "]");
      } else {
        return ("[" + modifier + "]");
      }
    } else {
      return ('')
    }
  }

  return (<TableContainer component={Paper}>
    <Table size="small">
      <TableBody>
        <TableRow>
          {
            character.abilities && character.abilities.map((abilities, index) => {
              return (<th key={index}>{abilities.category}</th>)
            })
          }
        </TableRow>
        <TableRow>
          {
            character.abilities && character.abilities.map((abilities, index) => {
              return (<TableCell key={index} align="center">
                <TextField type="number" variant="outlined" size="small" margin="none" min={1} max={18} name={abilities.category + "Score"} value={abilities.score} className={classes.textField} onChange={updateAbilityScore(index)}/>
              </TableCell>)
            })
          }
        </TableRow>
        <TableRow>
          {
            character.abilities && character.abilities.map((abilities, index) => {
              return (<TableCell key={index} align="center">
                <TextField variant="outlined" name={abilities.category + "Modifier"} value={abilityModifier(abilities.score, abilities.affliction)} InputProps={{
                    readOnly: true
                  }} className={classes.textFieldBold}/>
              </TableCell>)
            })
          }
        </TableRow>
        <TableRow>
          {
            character.abilities && character.abilities.map((abilities, index) => {
              const ab = abilities.category;
              return (<TableCell key={index} align="center">
                <FormControl variant="outlined" size="small" className={classes.formControl}>
                  <Select tabIndex={-1} value={abilities.affliction || "null"} name={abilities.category + "Affliction"} onChange={updateAbilityAffliction(index)}>
                    {
                      abilityAfflictions.[ab].map((data, key) => {
                        return (<MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>);
                      })
                    }
                  </Select>
                </FormControl>
              </TableCell>)
            })
          }
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>);
}
