import React, {useContext} from 'react';
import CampaignState from './contexts/CampaignState';

function CampaignDetails() {

  // Accessing and adding to character using context and useEffect
  const [campaign] = useContext(CampaignState);

  return (<table style={{
      "width" : "100%"
    }}>
    <tbody>
      <tr>
        <th style={{
            "width" : "25%"
          }}>
          <label htmlFor="backstory">CHARACTERS</label>
        </th>
      </tr>
      {
        campaign.campaign && campaign.campaign.map((character, index) => {
          return (<tr key={index}>
            <td>
              <div>{character.charaName} ({character.player}) HP:{character.hp} XP:{character.xp}</div>
            </td>
          </tr>)
        })
      }
    </tbody>
  </table>);
}

export default CampaignDetails;
