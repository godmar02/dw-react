import React, {useState, useEffect} from 'react';
import CharacterState from './contexts/CharacterState';
import { useParams } from "react-router";
import * as FirebaseService from '../services/firebase';
import CharacterSheetHeader from './CharacterSheetHeader'
import CharacterDetailsTable from './CharacterDetailsTable'
import CharacterTypeTable from './CharacterTypeTable'
import BasicAttributesTable from './BasicAttributesTable'
import AbilitiesTable from './AbilitiesTable'
import BondsTable from './BondsTable'
import ItemsTable from './ItemsTable'
import ClassFeaturesTable from './ClassFeaturesTable'

function CharacterSheet() {

  // Definitions for state
  const [character, setCharacter] = useState({});
  const [error, setError] = useState();

  // retrieve URL parameters for usage
  const { campaignURL } = useParams();
  const { characterURL } = useParams();

  /*
  useEffect(() => {
    if (campaignURL && characterURL) {
      FirebaseService.getCharacter(campaignURL, characterURL)
        .then(character => {
          if (character.exists) {
            setError(null);
            setCharacter(character.data());
          } else {
            setError('Character-not-found');
            setCharacter();
          }
        })
        .catch(() => setError('Character-get-fail'));
    }
  }, [character, setCharacter]);
  */

  // Setting state for Character using useEffect hook
  useEffect(() => {
    setCharacter({
      abilities: [
        {category: "STR", score: 1, affliction: "Weak"},
        {category: "DEX", score: 1, affliction: "Unafflicted"},
        {category: "CON", score: 1, affliction: "Unafflicted"},
        {category: "INT", score: 1, affliction: "Unafflicted"},
        {category: "WIS", score: 1, affliction: "Unafflicted"},
        {category: "CHA", score: 1, affliction: "Unafflicted"}
      ],
      alignment: "Good",
      armour: 3,
      backstory: "sad backstory",
      bonds: [
        {bond: "bond0"},
        {bond: "bond1"}
      ],
      charaName: "Bob",
      classFeatures: [
        {feature: "classFeature0", checkbox: true},
        {feature: "classFeature1", checkbox: false},
      ],
      dwClass: "Paladin",
      funds: 10,
      hp:2,
      items: [
        {item: "item0", weight: 1},
        {item: "item1", weight: 2}
      ],
      level: 2,
      look: "scraggly",
      owner: "owner@email.com",
      race: "Elf",
      xp: 2
    })
  }, [setCharacter]);

  console.log("character state:",character);

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
    <AbilitiesTable/>
    <br/>
    <BondsTable/>
    <br/>
    <ItemsTable/>
    <br/>
    <ClassFeaturesTable/>
    <br/>
  </CharacterState.Provider>);
}

export default CharacterSheet;
