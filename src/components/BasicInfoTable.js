import React, {useContext, useEffect} from 'react';
import CharacterState from './contexts/CharacterState'

function BasicInfoTable() {

  // Accessing and adding to character using context and useEffect
  const [character, setCharacter] = useContext(CharacterState);
  useEffect(() => {
    setCharacter(character => ({
      ...character,
      address: "adress"
    }))
  }, [setCharacter]);

  return (<table style={{
      "width" : "100%"
    }} id="basicInfoTable">
    <tbody>
      <tr>
        <th style={{
            "width" : "25%"
          }}>
          <label htmlFor="charaName">CHARACTER</label>
        </th>
        <td><input type="text" className="charaName" id="charaName" value={character.charaName}/></td>
        <div></div>
      </tr>
      <tr>
        <th style={{
            "width" : "25%"
          }}>
          <label htmlFor="backstory">BACKSTORY</label>
        </th>
        <td><textarea placeholder="Describe your character's backstory and anything else about your characters identity here" id="backstory" defaultValue={""} value={character.backstory}/></td>
      </tr>
      <tr>
        <th style={{
            "width" : "25%"
          }}>
          <label htmlFor="look">LOOK</label>
        </th>
        <td><textarea placeholder="Describe your character's appearance here" id="look" defaultValue={""} value={character.look}/></td>
      </tr>
    </tbody>
  </table>);
}

export default BasicInfoTable;
