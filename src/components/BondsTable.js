import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function BondsTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table style={{"width" : "100%"}} id="bondsTable">
      <thead>
        <tr>
          <th style={{"width" : "100%"}}>
            <label>BONDS</label>
          </th>
          <td>
            <button type="button" className="addRow" id="addBond">+</button>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <textarea placeholder="Add 2-3 bonds here" id="bond0" defaultValue={""}/>
          </td>
          <td>
            <button type="button" className="deleteRow" id="deleteBond0"/>
          </td>
        </tr>
      </tbody>
      <tfoot/>
    </table>
    );
}

export default BondsTable;