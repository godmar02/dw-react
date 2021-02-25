import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {races} from '../data/raceList';
import {dwClasses} from '../data/classList';
import {alignments} from '../data/classAlignments';
import {classDetails} from '../data/classDetails';

function CharacterTypeTable() {

  // Accessing and adding to character using context and useEffect
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
          <select
            tabIndex={-1}
            value={character.dwClass || "null"}
            onChange={event => {
              setCharacter(character => ({...character,dwClass: event.target.value}));
              setCharacter(character => ({...character,alignment: "null"}))}}>
            <option disabled value="null" hidden />
            {
              dwClasses.map((data, key) => {
                return (
                <option value={data} key={key}>
                  {data}
                </option>);
              })
            }
            </select>
        </td>
        <td style={{"width" : "50%"}}/>
      </tr>
      <tr>
        <th>
          <label htmlFor="race">RACE</label>
        </th>
        <td>
          <select
            tabIndex={-1}
            value={character.race || "null"}
            onChange={event => setCharacter(character => ({...character,race: event.target.value}))}>
            <option disabled value="null" hidden />
            {
              races.map((data, key) => {
                return (
                <option value={data} key={key}>
                  {data}
                </option>);
              })
            }
          </select>
        </td>
        <td>
          <textarea className="grey" readOnly="readOnly" value={raceAttributes()}/>
        </td>
      </tr>
      <tr>
        <th>
          <label htmlFor="alignment">ALIGNMENT</label>
        </th>
        <td>
          <select
            tabIndex={-1}
            value={character.alignment || "null"}
            onChange={event => setCharacter(character => ({...character,alignment: event.target.value}))}>
            <option disabled value="null" hidden />
            {
              character.dwClass && alignments.[dwc].map((data, key) => {
              return (
              <option value={data} key={key}>
                {data}
              </option>);})
            }
          </select>
        </td>
        <td>
          <textarea className="grey" readOnly="readOnly" value={alignmentAttributes()}/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default CharacterTypeTable;
