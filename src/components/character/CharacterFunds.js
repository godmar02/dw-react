import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

function CharacterFunds() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <TextField
              type="number"
              variant="outlined"
              name="funds"
              label="Funds"
              min={0}
              value={character.funds || ''}
              onChange={event => setCharacter(character => ({...character,funds: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CharacterFunds;
