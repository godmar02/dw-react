import React, {useState, useEffect, useCallback} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { useParams } from "react-router";
import * as FirebaseService from 'services/firebase';
import CharacterSheetHeader from 'components/characterSheetHeader'
import CharacterDetailsTable from 'components/characterDetailsTable'
import CharacterTypeTable from 'components/characterTypeTable'
import CharacterBasicAttributesTable from 'components/characterBasicAttributesTable'
import CharacterAbilitiesTable from 'components/characterAbilitiesTable'
import CharacterBondsTable from 'components/characterBondsTable'
import CharacterItemsTable from 'components/characterItemsTable'
import CharacterClassFeaturesTable from 'components/characterClassFeaturesTable'

// Debounce function
const debounce = (callback,delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args),delay);
  }
}

function CharacterSheet() {

  // Definitions for state
  const [character, setCharacter] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // retrieve URL parameters for usage
  const { campaignURL, characterURL } = useParams();

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
            console.error("Error loading document:", error);
          }
      });
      return unsubscribe;
    }
  }, [campaignURL, characterURL, setCharacter]);

  // Saving character
  const debouncedSave = useCallback(
    debounce(character =>
      FirebaseService.saveCharacter(campaignURL, characterURL, character)
        .then(() => {
          setIsSaving(false);
          console.info('Saved Character:', character );
        })
        .catch((error) => {
          alert("Failed to save character data correctly, see console error");
          console.error("Error saving document:", error);
          //If saving fails then it will not retry until the error is rectified
        })
    , process.env.DEBOUNCE_SAVE_DELAY_MS),[]);

  useEffect(
    () => {
      if (character && Object.keys(character).length >= 1) {
        setIsSaving(true);
        debouncedSave(character);
      }
    }, [character] //Only trigger effect on change of character
  );

  console.info("CharacterState:",character);
  console.info("isSaving",isSaving);

  return (
  <CharacterState.Provider value={[character, setCharacter]}>
    <CharacterSheetHeader/>
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
