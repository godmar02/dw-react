import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {abilityAfflictions} from '../data/abilityAfflictions';

function AbilitiesTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

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
                  onChange={event => setCharacter(character => ({...character, score: {...character.abilities[index], score: event.target.value }}))} />
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
                  >
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
