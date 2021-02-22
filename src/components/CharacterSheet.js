import React from 'react';
import SheetHeader from './SheetHeader'
import BasicInfoTable from './BasicInfoTable'
import CharacterTypeTable from './CharacterTypeTable'
import BasicAttributesTable from './BasicAttributesTable'
import AbilitiesTable from './AbilitiesTable'
import BondsTable from './BondsTable'
import GearTable from './GearTable'
import ClassFeaturesTable from './ClassFeaturesTable'

function CharacterSheet() {

  return (<div>
    <SheetHeader/>
    <br/>
    <BasicInfoTable/>
    <br/>
    <CharacterTypeTable/>
    <br/>
    <BasicAttributesTable/>
    <br/>
    <AbilitiesTable/>
    <br/>
    <BondsTable/>
    <br/>
    <GearTable/>
    <br/>
    <ClassFeaturesTable/>
    <br/>
  </div>);
}

export default CharacterSheet;
