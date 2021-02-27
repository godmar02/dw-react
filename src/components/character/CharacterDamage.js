import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';

function CharacterDamage() {

  // State Variables
  const [character] = useContext(CharacterState);
  const dwc = character.dwClass;

  const damage = () => {
    if (character.dwClass) {
      return (classDetails.[dwc].damage);
    } else {
      return ('');
    }
  };

  return (
    <table id="damage">
      <thead>
        <tr>
          <th>
            <label htmlFor="damage">DAMAGE</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" className="shortfield grey" name="damage" readOnly="readOnly" value={damage()}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default CharacterDamage;
