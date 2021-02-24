import React from 'react';
import Level from './Level'
import XP from './XP'

function BasicAttributesTable() {

  return (<>
    <table id="basicAttributes">
      <tbody>
        <tr>
          <Level/>
          <XP/>
        </tr>
      </tbody>
    </table>
  </>);
}

export default BasicAttributesTable;
