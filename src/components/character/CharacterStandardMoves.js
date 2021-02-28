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

export default CharacterStandardMoves;
