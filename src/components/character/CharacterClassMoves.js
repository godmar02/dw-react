import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classMoves} from 'data/movesList';

function CharacterClassMoves() {

  // State Variables
  const [character] = useContext(CharacterState);
  const dwc = character.dwClass;

  return (
  <table style={{"width" : "100%"}} name="standardMoves">
    <thead>
      <tr>
        <th>
          <label style={{
              "width" : "25%"
            }} htmlFor="standardMoves">CLASS STARTING MOVES</label>
        </th>
      </tr>
    </thead>
    <tbody>
        { dwc && classMoves.[dwc].startingMoves.map((data) => {
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

export default CharacterClassMoves;
