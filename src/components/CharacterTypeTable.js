import React from 'react';
import {races} from '../data/raceList'
import {dwClasses} from '../data/classList'

function CharacterTypeTable() {

  return (<table style={{
      "width" : "100%"
    }} id="additionalInfoTable">
    <tbody>
      <tr>
        <th>
          <label style={{
              "width" : "25%"
            }} htmlFor="dwClass">CLASS</label>
        </th>
        <td style={{
            "width" : "25%"
          }}>
          <select tabIndex={-1} id="dwClass">
            {
              dwClasses.map((data) => {
                return (<option>
                  {data}
                </option>);
              })
            }
            </select>
        </td>
        <td style={{
            "width" : "50%"
          }}/>
      </tr>
      <tr>
        <th>
          <label htmlFor="race">RACE</label>
        </th>
        <td>
          <select tabIndex={-1} id="race">
          {
            races.map((data, key) => {
              return (<option>
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
          <select tabIndex={-1} id="alignment"/>
        </td>
        <td>
          <textarea className="grey" readOnly="readOnly" id="alignmentAttribute" defaultValue={""}/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default CharacterTypeTable;
