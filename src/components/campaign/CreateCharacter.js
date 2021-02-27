import React, {useState} from 'react';
import * as FirebaseService from 'services/firebase';
import {useParams} from 'react-router';

function CreateCharacter() {

  const [charaName, setCharaName] = useState("");
  const {campaignURL} = useParams();

  // Create New Character
  const saveCharacter = () => {
    if (campaignURL && charaName) { //don't save unless details present
      FirebaseService.createCharacter(campaignURL,charaName)
      .then(() => {
        console.info('Created Character:', charaName);
      })
      .catch((error) => {
        alert("Failed to create character, see console error");
        console.error("Error creating document:", error);
      });
    } else {
      alert('Cannot save blank character');
    }
  }

  return (
  <>
  <table style={{"width" : "100%"}} id="basicInfoTable">
    <tbody>
      <tr>
        <th style={{"width" : "25%"}}>
          <label htmlFor="shortName">SHORT NAME</label>
        </th>
        <td>
          <textarea placeholder="Add your characters short name here, you wont be able to change this one saved" name="shortName" onChange={event => setCharaName(event.target.value)}/>
        </td>
      </tr>
    </tbody>
  </table>
  <button onClick={() => saveCharacter()}>Save Character</button>
  </>
);
}

export default CreateCharacter;
