import React, {useState, useEffect} from 'react';
import CharacterState from './contexts/CharacterState';
import { useParams } from "react-router";
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

  // retrieve URL parameters for usage
  let { campaign } = useParams();

  console.log(campaign);

  // Definitions for state
  const [character, setCharacter] = useState({});

  // Setting state for Character using useEffect hook
  useEffect(() => {
    setCharacter({
          owner: "owner@email.com",
          charaName: "Bob",
          look: "scraggly",
          backstory: "sad backstory",
          dwClass: "Class1",
          race: "Race1",
          alignment: "Alignment1",
          level: 2,
          xp: 2,
          abilities: [
            {category: "str", afflicition: true},
            {category: "dex", afflicition: false},
            {category: "con", afflicition: false},
            {category: "int", afflicition: false},
            {category: "wis", afflicition: false},
            {category: "cha", afflicition: false}
          ],
          armour: 3,
          hp:2,
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
