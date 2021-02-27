import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';

function CharacterArmour() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table id="armour">
      <thead>
        <tr>
          <th>
            <label htmlFor="armour">ARMOUR</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="number" min={0} className="shortfield" name="armour" value={character.armour || ''} onChange={event => setCharacter(character => ({...character,armour: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CharacterArmour;
