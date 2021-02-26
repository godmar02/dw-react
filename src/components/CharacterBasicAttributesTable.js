import React from 'react';
import CharacterDamage from './CharacterDamage'
import CharacterArmour from './CharacterArmour'
import CharacterFunds from './CharacterFunds'
import CharacterHP from './CharacterHP'
import CharacterLevel from './CharacterLevel'
import CharacterXP from './CharacterXP'

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
