import React from 'react';
import {advancedMoves} from 'data/movesList';

function CharacterAdvancedMoves() {
  return (
  <table style={{"width" : "100%"}} name="advancedMoves">
    <thead>
      <tr>
        <th>
          <label style={{
              "width" : "25%"
            }} htmlFor="advancedMoves">ADVANCED MOVES</label>
        </th>
      </tr>
    </thead>
    <tbody>
      {
        advancedMoves.map((data) => {
          return (<>
          <tr>
            <td>
              {data.name}
            </td>
          </tr>
          <tr>
            <td>
              {data.description}
            </td>
          </tr>
          </>);
        })
      }
    </tbody>
  </table>);
}

export default CharacterAdvancedMoves;
