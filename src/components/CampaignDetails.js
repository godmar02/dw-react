import React, {useContext,useState} from 'react';
import CampaignState from './contexts/CampaignState';
import * as FirebaseService from '../services/firebase';
import {Link} from 'react-router-dom';
import {useParams} from "react-router";
import CreateCharacter from './CreateCharacter'

function CampaignDetails() {

  // Accessing and adding to character using context and useEffect
  const [campaign] = useContext(CampaignState);
  const [show, setShow] = useState(false);
  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  const deleteCharacter = (campaign,character) => {
    if (campaign && character) { //don't save unless details present
      FirebaseService.deleteCharacter(campaign,character)
      .then(() => {
        console.info('Deleted Character:', character);
      })
      .catch((error) => {
        alert("Failed to delete character, see console error");
        console.error("Error deleting document:", error);
      });
    } else {
      alert('Cannot delete blank character');
    }
  }

  return (
    <div>
    <table>
      <thead>
        <tr>
          <th colSpan="4">CHARACTERS</th>
          <th><button onClick={() => setShow(true)}>+</button></th>
        </tr>
      </thead>
      <tbody>
        {
          campaign.campaign && campaign.campaign.map((campaign, index) => {
            return (
            <tr key={index}>
              <td><Link to={"/dw-react/" + campaignURL + "/" + campaign.character}>{campaign.character}</Link></td>
              <td>({campaign.characterData.owner})</td>
              <td>HP: {campaign.characterData.hp}</td>
              <td>XP: {campaign.characterData.xp}</td>
                <td>
                  <button onClick={() => deleteCharacter(campaignURL, campaign.character)}>Delete</button>
                </td>
            </tr>)
          })
        }
      </tbody>
    </table>
      {show
        ? <CreateCharacter/>
        : null
      }
    </div>
  );
}

export default CampaignDetails;
