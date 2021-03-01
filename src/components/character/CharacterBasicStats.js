import React from 'react';
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import CharacterDamage from 'components/character/CharacterDamage'
import CharacterArmour from 'components/character/CharacterArmour'
import CharacterFunds from 'components/character/CharacterFunds'
import CharacterHP from 'components/character/CharacterHP'
import CharacterLevel from 'components/character/CharacterLevel'
import CharacterXP from 'components/character/CharacterXP'

function CharacterBasicStats() {

  return (
  <div>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}>Basic Stats
      </AccordionSummary>
      <AccordionDetails>
    <CharacterLevel/>
    <CharacterXP/>
    <CharacterDamage/>
    <CharacterArmour/>
    <CharacterFunds/>
    <CharacterHP/>
    </AccordionDetails>
  </Accordion>
  </div>);
}

export default CharacterBasicStats;
