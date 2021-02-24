import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function Damage() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

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
            <input type="text" className="shortfield grey" readOnly="readOnly" id="damage"/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Damage;
