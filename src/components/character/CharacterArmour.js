import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import TextField from '@material-ui/core/TextField';

function CharacterArmour() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  return (
    <table id="armour">
      <tbody>
        <tr>
          <td>
            <TextField
              type="number"
              variant="outlined"
              label="Armour"
              min={0}
              className="shortfield"
              name="armour" value={character.armour || ''} onChange={event => setCharacter(character => ({...character,armour: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CharacterArmour;
