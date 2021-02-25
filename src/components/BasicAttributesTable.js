import React from 'react';
import Damage from './Damage'
import Armour from './Armour'
import Funds from './Funds'
import HP from './HP'
import Level from './Level'
import XP from './XP'

function BasicAttributesTable() {

  return (
  <div className='myForm'>
    <div><Level/></div>
    <div><XP/></div>
    <div><Damage/></div>
    <div><Armour/></div>
    <div><Funds/></div>
    <div><HP/></div>
  </div>);
}

export default BasicAttributesTable;
