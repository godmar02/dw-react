import React, {useState} from 'react';
import * as FirebaseService from 'services/firebase';

function CreateCampaign() {

  const [campaignName, setCampaignName] = useState("");

  // Create New Character
  const saveCampaign = () => {
    if (campaignName) { //don't save unless details present
      FirebaseService.createCampaign(campaignName)
      .then(() => {
        console.info('Created Campaign:', campaignName);
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
