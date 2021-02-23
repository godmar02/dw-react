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
          dwClass: "Paladin",
          race: "Elf",
          alignment: "Alignment1",
          level: 2,
          xp: 2,
          abilities: [
            {category: "STR", score: 1, afflicition: "Unafflicted"},
            {category: "DEX", score: 1, afflicition: "Unafflicted"},
            {category: "CON", score: 1, afflicition: "Unafflicted"},
            {category: "INT", score: 1, afflicition: "Unafflicted"},
            {category: "WIS", score: 1, afflicition: "Unafflicted"},
            {category: "CHA", score: 1, afflicition: "Unafflicted"}
          ],
          armour: 3,
          hp:2,
          funds: 10,
          bonds: [
            {bond: "bond0"},
            {bond: "bond1"}
          ],
          gear: [
            {item: "item0", weight: 1},
            {item: "item1", weight: 2}
          ],
          classFeatures: [
            {feature: "classFeature0", checkbox: true},
            {feature: "classFeature1", checkbox: false},
          ]
        })
  }, [setCharacter]);
  console.log(character);

  // Use a custom hook to subscribe to the character provided as a URL query parameter
  //const [character, setCharacter] = useQueryString('character');

  return (
  <CharacterState.Provider value={[character, setCharacter]}>
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
