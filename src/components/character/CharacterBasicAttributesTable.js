import React from 'react';
import CharacterDamage from 'components/character/CharacterDamage'
import CharacterArmour from 'components/character/CharacterArmour'
import CharacterFunds from 'components/character/CharacterFunds'
import CharacterHP from 'components/character/CharacterHP'
import CharacterLevel from 'components/character/CharacterLevel'
import CharacterXP from 'components/character/CharacterXP'

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
