import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {abilityAfflictions} from '../data/abilityAfflictions';

function AbilitiesTable() {

  // Accessing and adding to character using context and useEffect
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
      return("+" + modifier);
    } else {
      return (modifier);
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
                  key={index}>
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
                <input
                  type="number"
                  min={1} max={18}
                  className="ability"
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
                <input
                  type="text"
                  className="grey tallfield"
                  value={abilityModifier(abilities.score, abilities.affliction)}
                  readOnly />
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
                <select
                  tabIndex={-1}
                  className="abilityAffliction"
                  value={abilities.affliction || "null"}
                  onChange={updateAbilityAffliction(index)}>
                  <option disabled value="null" hidden />
                    {
                      abilityAfflictions.[ab].map((data, key) => {
                        return (
                        <option value={data} key={key}>
                          {data}
                        </option>);
                      })
                    }
                </select>
              </td>)
           })
         }
         </tr>
       </tbody>
     </table>
    );
}

export default AbilitiesTable;
