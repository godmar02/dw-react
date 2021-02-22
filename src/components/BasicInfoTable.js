import React from 'react';

function BasicInfoTable() {

  return (
    <table style={{
        "width" : "100%"
      }} id="basicInfoTable">
      <tbody>
        <tr>
          <th style={{
              "width" : "25%"
            }}>
            <label htmlFor="charaName">CHARACTER</label>
          </th>
          <td><input type="text" className="charaName" id="charaName"/></td>
        </tr>
        <tr>
          <th style={{
              "width" : "25%"
            }}>
            <label htmlFor="backstory">BACKSTORY</label>
          </th>
          <td><textarea placeholder="Describe your character's backstory and anything else about your characters identity here" id="backstory" defaultValue={""}/></td>
        </tr>
        <tr>
          <th style={{
              "width" : "25%"
            }}>
            <label htmlFor="look">LOOK</label>
          </th>
          <td><textarea placeholder="Describe your character's appearance here" id="look" defaultValue={""}/></td>
        </tr>
      </tbody>
    </table>
    );
}

export default BasicInfoTable;
