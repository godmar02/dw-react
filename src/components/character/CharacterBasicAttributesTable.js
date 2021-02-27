import React from 'react';
import CharacterDamage from 'components/characterDamage'
import CharacterArmour from 'components/characterArmour'
import CharacterFunds from 'components/characterFunds'
import CharacterHP from 'components/characterHP'
import CharacterLevel from 'components/characterLevel'
import CharacterXP from 'components/characterXP'

function CharacterBasicAttributesTable() {

  return (
  <div className='myForm'>
    <div><CharacterLevel/></div>
    <div><CharacterXP/></div>
    <div><CharacterDamage/></div>
    <div><CharacterArmour/></div>
    <div><CharacterFunds/></div>
    <div><CharacterHP/></div>
  </div>);
}

export default CharacterBasicAttributesTable;
