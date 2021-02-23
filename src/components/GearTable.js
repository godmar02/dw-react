import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function GearTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table style={{"width":"100%"}} id="gearTable">
      <thead>
        <tr>
          <th colSpan={4}><label>GEAR</label></th>
        </tr>
        <tr>
          <th style={{"width":"100%"}}><label>ITEM</label></th>
          <th colSpan={2}><label>WEIGHT</label></th>
          <td>
            <button type="button" className="addRow" id="addItem">+</button>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <textarea placeholder="Add any items and descriptions here" id="item0" defaultValue={""} />
          </td>
          <td colSpan={2}><input type="number" min={0} id="itemWeight0" /></td>
          <td><button type="button" className="deleteRow" id="deleteItem0" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th><label htmlFor="load">LOAD</label></th>
          <td><input type="text" className="grey" readOnly id="load" /></td>
          <td><input type="text" className="grey" readOnly id="maxLoad" /></td>
          <td />
        </tr>
      </tfoot>
    </table>
    );
}

export default GearTable;
