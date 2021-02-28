import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import TextField from '@material-ui/core/TextField';

function CharacterLevel() {

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
              label="Level"
              min={1}
              className="shortfield"
              name="level"
              value={character.level || ''}
              onChange={event => setCharacter(character => ({...character,level: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>);
}

export default CharacterLevel;
