import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function ClassFeaturesTable() {

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
            <button type="button" className="addRow" id="addClassFeature">+</button>
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
                   checked={!!classFeatures.checkbox}
                   onChange={updateFeatureCheckbox(index)}/>
               </td>
                 <td>
                   <textarea
                     placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)"
                     value={classFeatures.feature}
                     onChange={updateFeature(index)}/>
                 </td>
                 <td>
                   <button
                     type="button"
                     className="deleteRow"/>
                 </td>
             </tr>)
          })
        }
      </tbody>
      <tfoot/>
    </table>
    );
}

export default ClassFeaturesTable;
