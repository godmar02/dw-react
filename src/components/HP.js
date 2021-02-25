import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';
import {classDetails} from '../data/classDetails';

function HP() {

  // Accessing and adding to character using context and useEffect
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
            <input type="number" min={0} className="shortfield" name="hp" value={character.hp || ''} onChange={event => setCharacter(character => ({...character,hp: event.target.value}))}/>
          </td>
          <td>
            <input type="text" className="shortfield grey" name="maxHp" readOnly="readOnly" value={maxHp()} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default HP;
