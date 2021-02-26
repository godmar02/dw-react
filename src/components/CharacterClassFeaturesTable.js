import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function CharacterClassFeaturesTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  // State manipulation
  const updateFeatureCheckbox = index => e => {
    let newFeatures = [...character.classFeatures]; // copying the old array
    newFeatures[index] = {...character.classFeatures[index], checkbox: e.target.checked}; // replace value
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  const updateFeature = index => e => {
    let newFeatures = [...character.classFeatures]; // copying the old array
    newFeatures[index] = {...character.classFeatures[index], feature: e.target.value}; // replace value
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  // Delete rows in the table
  const deleteFeatureRow = index => {
    const newFeatures = [...character.classFeatures]; // copying the old array
    if (character.classFeatures.length !== 1) { //don't delete last row
      newFeatures.splice(index, 1); // remove item from array
      setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
    } else {
      alert('Cannot delete final row');
    }
  }

  // Add rows in the table
  const addFeatureRow = () => {
    const newFeatures = [...character.classFeatures, {feature: "", checkbox: false}]; // copying the old array and adding blank item
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  return (
    <table style={{
        "width" : "100%"
      }} id="classFeaturesTable">
      <thead>
        <tr>
          <th colSpan={2} style={{
              "width" : "100%"
            }}>
            <label>CLASS FEATURES</label>
          </th>
          <td>
            <button
              type="button"
              className="addRow"
              onClick={() => addFeatureRow()}>
              +
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
          {
           character.classFeatures && character.classFeatures.map((classFeatures,index) => {
           return (
             <tr key={index}>
               <td>
                 <input
                   type="checkbox"
                   className="checkbox"
                   name={"classFeatureCheckbox" + index}
                   checked={!!classFeatures.checkbox}
                   onChange={updateFeatureCheckbox(index)}/>
               </td>
                 <td>
                   <textarea
                     placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)"
                     value={classFeatures.feature}
                     name={"classFeature" + index}
                     onChange={updateFeature(index)}/>
                 </td>
                 <td>
                   <button
                     type="button"
                     className="deleteRow"
                     onClick={() => deleteFeatureRow(index)}/>
                 </td>
             </tr>)
          })
        }
      </tbody>
      <tfoot/>
    </table>
    );
}

export default CharacterClassFeaturesTable;
