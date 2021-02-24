import React from 'react';
import Damage from './Damage'
import Armour from './Armour'
import Funds from './Funds'
import HP from './HP'

function ExtraAttributes() {

  return (
  <div className='myForm'>
    <div><Damage/></div>
    <div><Armour/></div>
    <div><Funds/></div>
    <div><HP/></div>
  </div>);
}

export default ExtraAttributes;
