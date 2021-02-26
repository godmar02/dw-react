import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function CharacterXP() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  // Total Load
  const calcMaxXp = () => {
    if (character.level) {
      return ("/ " + (parseInt(character.level,10) + 7));
    } else {
      return ('');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>
            <label htmlFor="xp">XP</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="number" min={0} className="shortfield" name="xp" value={character.xp || ''} onChange={event => setCharacter(character => ({...character,xp: event.target.value}))}/>
          </td>
          <td>
            <input type="text" className="shortfield grey" name="maxXp" readOnly="readOnly" value={calcMaxXp()} />
          </td>
        </tr>
      </tbody>
    </table>);
}

export default CharacterXP;
