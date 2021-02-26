import React, {useContext} from 'react';
import CampaignState from './contexts/CampaignState';
import {Link} from 'react-router-dom';
import {useParams} from "react-router";

function CampaignDetails() {

  // Accessing and adding to character using context and useEffect
  const [campaign] = useContext(CampaignState);

  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  return (
    <table>
      <thead>
        <tr>
          <th>CHARACTERS</th>
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
            </tr>)
          })
        }
      </tbody>
    </table>
  );
}

export default CampaignDetails;
