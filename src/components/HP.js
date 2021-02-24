import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function Funds() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table id="hp">
      <thead>
        <tr>
          <th colSpan={2}>
            <label htmlFor="hp">HP</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="number" min={0} className="shortfield" id="hp" value={character.hp || ''} onChange={event => setCharacter(character => ({...character,hp: event.target.value}))}/>
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="maxHp"/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Funds;
