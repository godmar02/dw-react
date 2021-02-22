import React, {useState, useEffect} from 'react';
import CharacterState from './contexts/CharacterState';
import SheetHeader from './SheetHeader'
import BasicInfoTable from './BasicInfoTable'
import CharacterTypeTable from './CharacterTypeTable'
import BasicAttributesTable from './BasicAttributesTable'
import AbilitiesTable from './AbilitiesTable'
import BondsTable from './BondsTable'
import GearTable from './GearTable'
import ClassFeaturesTable from './ClassFeaturesTable'
//import useQueryString from './hooks/useQueryString'

function CharacterSheet() {

  // Definitions for state
  const [character, setCharacter] = useState({});

  // Setting state for Character using useEffect hook
  useEffect(() => {
    setCharacter(character => ({
      ...character,
      address: "address1"
    }))
  }, [character, setCharacter]);

  // Use a custom hook to subscribe to the character provided as a URL query parameter
  //const [character, setCharacter] = useQueryString('character');

  return (<CharacterState.Provider value={[character, setCharacter]}>
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
  </CharacterState.Provider>);
}

export default CharacterSheet;
