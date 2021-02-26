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

  // Use an effect hook to subscribe to the character stream and
  // automatically unsubscribe when the component unmounts.
  //useEffect(() => {
  //  if (campaignURL && characterURL) {
  //    const unsubscribe = FirebaseService.streamCharacter(campaignURL, characterURL, {
  //        next: documentSnapshot => {
  //            setCharacter(documentSnapshot.data());
  //        },
  //        error: (error) => {
  //  alert("Failed to load character data correctly, see console error");
  //  console.error("Error loading data:", error);
  //}
  //    });
  //    return unsubscribe;
  //  }
  //}, [campaignURL, characterURL, setCharacter]);

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
