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
    setCharacter({
          owner: "owner",
          charaName: "charaName",
          look: "look",
          backstory: "backstory",
          dwClass: "dwClass",
          race: "race",
          alignment: "alignment",
          level: 1,
          xp: 1,
          abilities: [
            {category: "str", afflicition: true},
            {category: "dex", afflicition: false},
            {category: "con", afflicition: false},
            {category: "int", afflicition: false},
            {category: "wis", afflicition: false},
            {category: "cha", afflicition: false}
          ],
          armour: 1,
          hp:1,
          funds: 10,
          bonds: ["bond0"],
          gear: {
            items: ["item0"],
            itemsWeights: [1]
          },
          classFeatures: {
            classFeatures: ["classFeature0"],
            classFeaturesCheckboxes: [true]
          }
        })
  }, [setCharacter]);
  console.log(character);

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
