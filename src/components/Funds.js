import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function Funds() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table id="funds">
      <thead>
        <tr>
          <th>
            <label htmlFor="funds">FUNDS</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="number" className="shortfield" name="funds"
              min={0} id="funds" value={character.funds || ''} onChange={event => setCharacter(character => ({...character,funds: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Funds;
