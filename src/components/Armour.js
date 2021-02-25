import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function Armour() {

  // Accessing and adding to character using context and useEffect
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

export default Armour;
