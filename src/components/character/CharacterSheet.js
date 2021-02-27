import React, {useState, useEffect, useCallback} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { useParams } from "react-router";
import * as FirebaseService from 'services/firebase';
import CharacterSheetHeader from 'components/character/CharacterSheetHeader'
import CharacterDetailsTable from 'components/character/CharacterDetailsTable'
import CharacterTypeTable from 'components/character/CharacterTypeTable'
import CharacterBasicAttributesTable from 'components/character/CharacterBasicAttributesTable'
import CharacterAbilitiesTable from 'components/character/CharacterAbilitiesTable'
import CharacterBondsTable from 'components/character/CharacterBondsTable'
import CharacterItemsTable from 'components/character/CharacterItemsTable'
import CharacterClassFeaturesTable from 'components/character/CharacterClassFeaturesTable'
import CharacterStandardMoves from 'components/character/CharacterStandardMoves'
import CharacterAdvancedMoves from 'components/character/CharacterAdvancedMoves'
import CharacterClassMoves from 'components/character/CharacterClassMoves'

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
    <CharacterStandardMoves/>
    <br/>
    <CharacterAdvancedMoves/>
    <br/>
    <CharacterClassMoves/>
  </CharacterState.Provider>);
}

export default CharacterSheet;
