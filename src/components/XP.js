import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function XP() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table>
      <tbody>
        <tr>
          <th>
            <label htmlFor="xp">XP</label>
          </th>
          <td>
            <input type="number" min={0} className="shortfield" id="xp" value={character.xp || ''} onChange={event => setCharacter(character => ({...character,xp: event.target.value}))}/>
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="maxXp"/>
          </td>
        </tr>
      </tbody>
    </table>);
}

export default XP;
