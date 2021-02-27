import React from 'react';
import {standardMoves} from 'data/movesList';

function CharacterStandardMoves() {
  return (
  <table style={{"width" : "100%"}} name="standardMoves">
    <thead>
      <tr>
        <th>
          <label style={{
              "width" : "25%"
            }} htmlFor="standardMoves">STANDARD MOVES</label>
        </th>
      </tr>
    </thead>
    <tbody>
        {
          standardMoves.map((data) => {
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

export default CharacterStandardMoves;
