import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function ClassFeaturesTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

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
                   checked={!!classFeatures.checkbox}/>
               </td>
                 <td>
                   <textarea
                     placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)"
                     defaultValue={""}
                     value={classFeatures.feature}
                     />
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
