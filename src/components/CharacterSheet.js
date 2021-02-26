import React, {useState, useEffect} from 'react';
import CharacterState from './contexts/CharacterState';
import { useParams } from "react-router";
import * as FirebaseService from '../services/firebase';
import CharacterSheetHeader from './CharacterSheetHeader'
import CharacterDetailsTable from './CharacterDetailsTable'
import CharacterTypeTable from './CharacterTypeTable'
import CharacterBasicAttributesTable from './CharacterBasicAttributesTable'
import CharacterAbilitiesTable from './CharacterAbilitiesTable'
import CharacterBondsTable from './CharacterBondsTable'
import CharacterItemsTable from './CharacterItemsTable'
import CharacterClassFeaturesTable from './CharacterClassFeaturesTable'
import Autosave from './Autosave'

function CharacterSheet() {

  // Definitions for state
  const [character, setCharacter] = useState({});

  // retrieve URL parameters for usage
  const { campaignURL, characterURL } = useParams();

/*
  // Use an effect hook to subscribe to the character stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    if (campaignURL && characterURL) {
      const unsubscribe = FirebaseService.streamCharacter(campaignURL, characterURL, {
          next: documentSnapshot => {
              setCharacter(documentSnapshot.data());
          },
          error: (error) => {
    alert("Failed to load character data correctly, see console error");
    console.error("Error loading data:", error);
  }
      });
      return unsubscribe;
    }
  }, [campaignURL, characterURL, setCharacter]);
  */

  // Setting state for character manually
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
      charaFullName: "Bobesque",
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
      owner: "markwgodden@gmail.com",
      race: "Elf",
      xp: 2
    })
  }, [setCharacter]);

  console.log("character state:",character);

  return (
  <CharacterState.Provider value={[character, setCharacter]}>
    <CharacterSheetHeader/>
    <Autosave character={character}/>
    <br/>
    <CharacterDetailsTable/>
    <br/>
    <CharacterTypeTable/>
    <br/>
    <CharacterBasicAttributesTable/>
    <br/>
    <CharacterAbilitiesTable/>
    <br/>
    <CharacterBondsTable/>
    <br/>
    <CharacterItemsTable/>
    <br/>
    <CharacterClassFeaturesTable/>
    <br/>
  </CharacterState.Provider>);
}

export default CharacterSheet;
