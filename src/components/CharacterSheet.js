import React, {useState, useEffect} from 'react';
import CharacterState from './contexts/CharacterState';
import { useParams } from "react-router";
import CharacterSheetHeader from './CharacterSheetHeader'
import CharacterDetailsTable from './CharacterDetailsTable'
import CharacterTypeTable from './CharacterTypeTable'
import BasicAttributesTable from './BasicAttributesTable'
import ExtraAttributes from './ExtraAttributes'
import AbilitiesTable from './AbilitiesTable'
import BondsTable from './BondsTable'
import GearTable from './GearTable'
import ClassFeaturesTable from './ClassFeaturesTable'

function CharacterSheet() {

  // Definitions for state
  const [character, setCharacter] = useState({});

  // retrieve URL parameters for usage
  const { campaignURL } = useParams();
  const { characterURL } = useParams();

  // Setting state for Character using useEffect hook
  useEffect(() => {
    setCharacter({
          owner: "owner@email.com",
          charaName: "Bob",
          look: "scraggly",
          backstory: "sad backstory",
          dwClass: "Paladin",
          race: "Elf",
          alignment: "Good",
          level: 2,
          xp: 2,
          abilities: [
            {category: "STR", score: 1, affliction: "Weak"},
            {category: "DEX", score: 1, affliction: "Unafflicted"},
            {category: "CON", score: 1, affliction: "Unafflicted"},
            {category: "INT", score: 1, affliction: "Unafflicted"},
            {category: "WIS", score: 1, affliction: "Unafflicted"},
            {category: "CHA", score: 1, affliction: "Unafflicted"}
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
  console.log("character state:",character);

  // Use a custom hook to subscribe to the character provided as a URL query parameter
  //const [character, setCharacter] = useQueryString('character');

  return (
  <CharacterState.Provider value={[character, setCharacter]}>
    <CharacterSheetHeader/>
    <br/>
    <CharacterDetailsTable/>
    <br/>
    <CharacterTypeTable/>
    <br/>
    <BasicAttributesTable/>
    <br/>
    <ExtraAttributes/>
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
