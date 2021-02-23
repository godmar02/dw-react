import React, {useContext} from 'react';
import CharacterState from './contexts/CharacterState';

function BasicAttributesTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);

  return (<>
    <table id="basicAttributes">
      <tbody>
        <tr>
          <th>
            <label htmlFor="level">LEVEL</label>
          </th>
          <td>
            <input type="number" min={1} className="shortfield" id="level" value={character.level || ''} onChange={event => setCharacter(character => ({...character,level: event.target.value}))}/>
          </td>
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
    </table>
    <br/>
    <table id="damageArmourFundsTable">
      <thead>
        <tr>
          <th>
            <label htmlFor="damage">DAMAGE</label>
          </th>
          <th>
            <label htmlFor="armour">ARMOUR</label>
          </th>
          <th colSpan={2}>
            <label htmlFor="hp">HP</label>
          </th>
          <th>
            <label htmlFor="funds">FUNDS</label>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="damage"/>
          </td>
          <td>
            <input type="number" min={0} className="shortfield" id="armour" value={character.armour || ''} onChange={event => setCharacter(character => ({...character,armour: event.target.value}))}/>
          </td>
          <td>
            <input type="number" min={0} className="shortfield" id="hp" value={character.hp || ''} onChange={event => setCharacter(character => ({...character,hp: event.target.value}))}/>
          </td>
          <td>
            <input type="text" className="shortfield grey" readOnly="readOnly" id="maxHp"/>
          </td>
          <td>
            <input type="number" className="shortfield" min={0} id="funds" value={character.funds || ''} onChange={event => setCharacter(character => ({...character,funds: event.target.value}))}/>
          </td>
        </tr>
      </tbody>
    </table>
  </>);
}

export default BasicAttributesTable;
