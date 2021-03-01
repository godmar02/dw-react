import React from 'react';
import CharacterDamage from 'components/character/CharacterDamage'
import CharacterArmour from 'components/character/CharacterArmour'
import CharacterFunds from 'components/character/CharacterFunds'
import CharacterHP from 'components/character/CharacterHP'
import CharacterLevel from 'components/character/CharacterLevel'
import CharacterXP from 'components/character/CharacterXP'

function CharacterBasicAttributes() {

  return (<div>
    <CharacterLevel/>
    <CharacterXP/>
    <CharacterDamage/>
    <CharacterArmour/>
    <CharacterFunds/>
    <CharacterHP/>
  </div>);
}

export default CharacterBasicAttributes;
