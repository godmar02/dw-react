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
        <tr>
          <td>
            <input type="checkbox" className="checkbox" id="classFeatureCheckbox0"/>
          </td>
          <td>
            <textarea placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)" id="classFeature0" defaultValue={""}/>
          </td>
          <td>
            <button type="button" className="deleteRow" id="deleteClassFeature0"/>
          </td>
        </tr>
      </tbody>
      <tfoot/>
    </table>
    );
}

export default ClassFeaturesTable;
