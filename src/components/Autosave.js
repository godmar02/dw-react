import {
  useState,
  useRef,
  useEffect
} from "react";
import {
  useParams
} from "react-router";
import _ from "lodash";
import * as FirebaseService from '../services/firebase';

function Autosave(character) {

  // retrieve URL parameters for usage
  const {
    campaignURL,
    characterURL
  } = useParams();
  const saveCharacter = character.character;

  // State and setters
  // Saving status (whether there is pending save request)
  const [isSaving, setIsSaving] = useState(false);

  const debounceSave = useRef(
    _.debounce(saveCharacter => {
      FirebaseService.saveCharacter(campaignURL, characterURL, saveCharacter)
        .then((results) => {
          setIsSaving(false);
          console.log('Saving Character...');
        })
        .catch((error) => {
          alert("Failed to save character data correctly, see console error");
          console.error("Error saving document:", error);
        });
    }, 10000,)
  );

  useEffect(
    () => {
      if (saveCharacter && !isSaving) {
        setIsSaving(true);
        console.log('Triggering Character Save...')
        console.log('isSaving:', isSaving);
        console.log("saveCharacter: ", saveCharacter);
        debounceSave.current(saveCharacter);
      }
    },
    [isSaving, setIsSaving, saveCharacter] // Only call effect if debounced save term changes
  );

  return null;
}

export default Autosave;
