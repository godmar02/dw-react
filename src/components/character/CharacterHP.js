import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {classDetails} from 'data/classDetails';
import TextField from '@material-ui/core/TextField';

function CharacterHP() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  const dwc = character.dwClass;
  const maxHp = () => {
    if (character.dwClass && character.abilities) {
      return ("/ " + (classDetails.[dwc].baseHp + parseInt(character.abilities.find(x => x.category === 'CON').score ,10)));
    } else {
      return ('');
    }
  };

  return (
    <table id="hp">
      <tbody>
        <tr>
          <td>
            <TextField
              type="number"
              variant="outlined"
              label="HP"
              min={0}
              className="shortfield"
              name="hp"
              value={character.hp || ''}
              onChange={event => setCharacter(character => ({...character,hp: event.target.value}))}/>
          </td>
          <td>
            <TextField
              variant="outlined"
              className="shortfield grey"
              label="Max HP"
              name="maxHp"
              InputProps={{
                readOnly: true,
              }}
              value={maxHp()} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CharacterHP;
