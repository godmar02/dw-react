import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {races} from '../data/raceList';
import {dwClasses} from '../data/classList';
import {alignments} from '../data/classAlignments';

function CharacterTypeTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (<table style={{"width" : "100%"}} id="additionalInfoTable">
    <tbody>
      <tr>
        <th>
          <label style={{"width" : "25%"}} htmlFor="dwClass">CLASS</label>
        </th>
        <td style={{"width" : "25%"}}>
          <select tabIndex={-1} id="dwClass" onChange={e => setCharacter(character => ({...character,dwClass: e.target.value}))}>
            {
              dwClasses.map((data, key) => {
                return (<option  value={data} key={key}>
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
          <select tabIndex={-1} id="race" onChange={e => setCharacter(character => ({...character,race: e.target.value}))}>
          {
            races.map((data, key) => {
              return (<option value={data} key={key}>
                {data}
              </option>);
            })
          }
          </select>
        </td>
        <td>
          <textarea className="grey" readOnly="readOnly" id="raceAttribute" defaultValue={""}/>
        </td>
      </tr>
      <tr>
        <th>
          <label htmlFor="alignment">ALIGNMENT</label>
        </th>
        <td>
          <select tabIndex={-1} id="alignment" onChange={e => setCharacter(character => ({...character,alignment: e.target.value}))}>
            {
              dwClasses.map((data, key) => {
                return (<option value={data} key={key}>
                  {data}
                </option>);
              })
            }
          </select>
        </td>
        <td>
          <textarea className="grey" readOnly="readOnly" id="alignmentAttribute" defaultValue={""}/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default CharacterTypeTable;
