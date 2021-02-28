import React, {useState,useContext} from 'react';
import * as FirebaseService from 'services/firebase';
import CreateCampaignState from 'components/contexts/CreateCampaignState';
import AuthState from 'components/contexts/AuthState';

function CreateCampaign() {

  const [campaignName, setCampaignName] = useState("");
  const [show,setShow] = useContext(CreateCampaignState);
  const [currentUser] = useContext(AuthState);
  const toggleSetShow = () => setShow(!show);

  // Create New Character
  const saveCampaign = () => {
    if (campaignName) { //don't save unless details present
      FirebaseService.createCampaign(campaignName,currentUser.email)
      .then(() => {
        console.info('Created Campaign:', campaignName);
        toggleSetShow();
      })
      .catch((error) => {
        alert("Failed to create campaign, see console error");
        console.error("Error creating document:", error);
      });
    } else {
      alert('Cannot save blank campaign');
    }
  }

  return (
  <>
  <table style={{"width" : "100%"}} id="basicInfoTable">
    <tbody>
      <tr>
        <th style={{"width" : "25%"}}>
          <label htmlFor="campName">CAMPAIGN NAME</label>
        </th>
        <td>
          <textarea placeholder="Add your new Campaign Name, you wont be able to change this one saved" name="campName" onChange={event => setCampaignName(event.target.value)}/>
        </td>
      </tr>
    </tbody>
  </table>
  <button onClick={() => saveCampaign()}>Save Campaign</button>
  </>
);
}

export default CreateCampaign;
