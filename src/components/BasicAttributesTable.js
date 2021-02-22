import React from 'react';

function BasicAttributesTable() {

  return (<div>
    <table id="basicAttributes">
      <tbody>
        <tr>
          <th>
            <label htmlFor="level">LEVEL</label>
          </th>
          <td>
            <input type="number" min={1} className="shortfield" defaultValue={1} id="level"/>
          </td>
          <th>
            <label htmlFor="xp">XP</label>
          </th>
          <td>
            <input type="number" min={0} className="shortfield" defaultValue={0} id="xp"/>
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="maxXp"/>
          </td>
        </tr>
      </tbody>
    </table>
    <br/>
    <table id="damageArmourFundsTable">
      <thead>
        <tr>
          <th>
            <label htmlFor="damage">DAMAGE</label>
          </th>
          <th>
            <label htmlFor="armour">ARMOUR</label>
          </th>
          <th colSpan={2}>
            <label htmlFor="hp">HP</label>
          </th>
          <th>
            <label htmlFor="funds">FUNDS</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="damage"/>
          </td>
          <td>
            <input type="number" min={0} className="shortfield" defaultValue={0} id="armour"/>
          </td>
          <td>
            <input type="number" min={0} className="shortfield" id="hp"/>
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="maxHp"/>
          </td>
          <td><input type="number" className="shortfield" min={0} defaultValue={0} id="funds"/></td>
        </tr>
      </tbody>
    </table>
  </div>);
}

export default BasicAttributesTable;
