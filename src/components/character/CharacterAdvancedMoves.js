import React from 'react';
import {advancedMoves} from 'data/movesList';

function CharacterAdvancedMoves() {
  return (
  <table style={{"width" : "100%"}} name="standardMoves">
    <thead>
      <tr>
        <th>
          <label style={{
              "width" : "25%"
            }} htmlFor="standardMoves">ADVANCED MOVES</label>
        </th>
      </tr>
    </thead>
    <tbody>
        {
          advancedMoves.map((data) => {
            return (
              <React.Fragment key={data.name}>
            <tr>
              <td>
                {data.name}
              </td>
            </tr>
            <tr>
              <td>
                <div dangerouslySetInnerHTML={{__html: data.description }}></div>
              </td>
            </tr>
          </React.Fragment>);
          })
        }
    </tbody>
  </table>);
}

export default CharacterAdvancedMoves;
