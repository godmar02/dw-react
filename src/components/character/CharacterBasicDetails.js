import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {TextField} from '@material-ui/core';

function CharacterBasicDetails() {

  // State Variables
  const [character, setCharacter] = useContext(CharacterState);

  return (<table style={{"width" : "100%"}}>
    <tbody>
      <tr>
        <th style={{"width" : "25%"}}>
          <label htmlFor="fullName">FULL NAME</label>
        </th>
        <td>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Add your characters full name here"
            value={character.fullName}
            name="fullName"
            onChange={event => setCharacter(character => ({...character,fullName: event.target.value}))}/>
        </td>
      </tr>
      <tr>
        <th style={{"width" : "25%"}}>
          <label htmlFor="backstory">BACKSTORY</label>
        </th>
        <td>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Describe your character's backstory and anything else about your characters identity here"
            value={character.backstory}
            name="backstory"
            onChange={event => setCharacter(character => ({...character,backstory: event.target.value}))}/>
        </td>
      </tr>
      <tr>
        <th style={{"width" : "25%"}}>
          <label htmlFor="look">LOOK</label>
        </th>
        <td>
          <TextField
            multiline
            fullWidth
            variant="outlined"
            aria-label="empty textarea"
            placeholder="Describe your character's appearance here"
            name="look"
            value={character.look}
            onChange={event => setCharacter(character => ({...character,look: event.target.value}))}/>
        </td>
      </tr>
    </tbody>
  </table>);
}

export default CharacterBasicDetails;
