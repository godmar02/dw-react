import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function CharacterLevel() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            <label htmlFor="level">LEVEL</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="number" min={1} className="shortfield" name="level" value={character.level || ''} onChange={event => setCharacter(character => ({...character,level: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>);
}

export default CharacterLevel;