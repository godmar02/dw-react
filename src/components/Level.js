import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function Level() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table>
      <tbody>
        <tr>
          <th>
            <label htmlFor="level">LEVEL</label>
          </th>
          <td>
            <input type="number" min={1} className="shortfield" name="level" value={character.level || ''} onChange={event => setCharacter(character => ({...character,level: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>);
}

export default Level;
