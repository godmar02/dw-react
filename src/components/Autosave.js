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
  console.log("saveCharacter: ", saveCharacter);
  console.log("campaignURL:", campaignURL);
  console.log("characterURL:", characterURL);


  // State and setters
  // Saving status (whether there is pending save request)
  const [isSaving, setIsSaving] = useState(false);

  const debounceSave = useRef(
    _.debounce(saveCharacter => {
      FirebaseService.saveCharacter(campaignURL, characterURL, saveCharacter)
        .then((results) => {
          setIsSaving(false);
          console.log('isSaving:', isSaving);
          console.log('results:', results);
        })
        .catch((error) => {
          alert("Failed to save character data correctly, see console error");
          console.error("Error saving document:", error);
        });
    }, process.env.DEBOUNCE_SAVE_DELAY_MS)
  );

  useEffect(
    () => {
      if (saveCharacter) {
        setIsSaving(true);
        console.log('isSaving:', isSaving);
        debounceSave.current(saveCharacter);
      }
    },
    [saveCharacter] // Only call effect if debounced save term changes
  );

  return null;
}

export default Autosave;
