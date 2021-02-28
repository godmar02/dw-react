import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {abilityAfflictions} from 'data/abilityAfflictions';
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

function CharacterAbilitiesTable() {

  const classes = useStyles();
  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  const updateAbilityScore = index => e => {
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {...character.abilities[index], score: e.target.value}; // replace value
    setCharacter(character => ({...character, abilities: newAbilities})); // set array back
  }

  const updateAbilityAffliction = index => e => {
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {...character.abilities[index], affliction: e.target.value}; // replace value
    setCharacter(character => ({...character, abilities: newAbilities})); // set array back
  }

  const abilityModifier = (abilityScore, abilityAffliction) => {

    if (abilityScore && abilityAffliction) {
    let baseModifier;
    let afflicted;

    abilityScore = parseInt(abilityScore,10);

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

    /*-1 if afflicted*/
    if (abilityAffliction === "Unafflicted") {
      afflicted = 0;
    } else {
      afflicted = 1;
    }

    let modifier = (baseModifier - afflicted);

    if (modifier > 0) {
      return("[+" + modifier+ "]");
    } else {
      return ("[" + modifier + "]");
    }
  } else {
    return ('')
  }
  }

  return (
     <table style={{"width":"100%"}} id="abilitiesTable">
       <thead>
         <tr>
           {
            character.abilities && character.abilities.map((abilities, index) => {
            return (
              <th key={index}>
                <label
                  htmlFor={abilities.category}
                  value={abilities.category}
                  name={abilities.category}>
                  {abilities.category}
                </label>
              </th>)
           })
         }
         </tr>
       </thead>
       <tbody>
         <tr>
           {
            character.abilities && character.abilities.map((abilities, index) => {
            return (
              <td key={index}>
                <TextField
                  type="number"
                  variant="outlined"
                  min={1} max={18}
                  className="ability"
                  name={abilities.category + "Score"}
                  value={abilities.score}
                  onChange={updateAbilityScore(index)} />
            </td>)
           })
         }
         </tr>
         <tr>
           {
            character.abilities && character.abilities.map((abilities, index) => {
            return (
              <td key={index}>
                <TextField variant="outlined"
                  className="grey tallfield"
                  name={abilities.category + "Modifier"}
                  value={abilityModifier(abilities.score, abilities.affliction)}
                  InputProps={{
                    readOnly: true,
                  }} />
            </td>)
           })
         }
         </tr>
         <tr>
           {
            character.abilities && character.abilities.map((abilities,index) => {
            const ab = abilities.category;
            return (
              <td key={index}>
                <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  tabIndex={-1}
                  value={abilities.affliction || "null"}
                  name={abilities.category + "Affliction"}
                  onChange={updateAbilityAffliction(index)}>
                  <MenuItem disabled value="null" hidden />
                    {
                      abilityAfflictions.[ab].map((data, key) => {
                        return (
                        <MenuItem value={data} key={key}>
                          {data}
                        </MenuItem>);
                      })
                    }
                </Select>
              </FormControl>
              </td>)
           })
         }
         </tr>
       </tbody>
     </table>
    );
}

export default CharacterAbilitiesTable;
