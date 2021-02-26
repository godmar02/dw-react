import React, {useContext} from 'react';
import CampaignState from './contexts/CampaignState';
import {Link} from 'react-router-dom';
import { useParams } from "react-router";

function CampaignDetails() {

  // Accessing and adding to character using context and useEffect
  const [campaign] = useContext(CampaignState);

  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  return (<div>
    <div>CHARACTERS</div>
    {
      campaign.campaign && campaign.campaign.map((character, index) => {
        return (<div key={index}>
          <Link to={"/dw-react/" + campaignURL + "/" + character.charaName}>{character.charaName}</Link>
          <div>({character.player}) HP:{character.hp}
            XP:{character.xp}</div>
        </div>)
      })
    }
  </div>);
}

export default CampaignDetails;
