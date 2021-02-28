import React, {useState,useContext} from 'react';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import CreateCharacterState from 'components/contexts/CreateCharacterState';
import AuthState from 'components/contexts/AuthState';

function CreateCharacter() {

  const [charaName, setCharaName] = useState("");
  const [show,setShow] = useContext(CreateCharacterState);
  const [currentUser] = useContext(AuthState);
  const {campaignURL} = useParams();
  const toggleSetShow = () => setShow(!show);

  // Create New Character
  const saveCharacter = () => {
    if (campaignURL && charaName) { //don't save unless details present
      FirebaseService.createCharacter(campaignURL,charaName, currentUser.email)
      .then(() => {
        console.info('Created Character:', charaName);
        toggleSetShow();
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
