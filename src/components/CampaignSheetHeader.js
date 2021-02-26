import React, {useContext} from 'react';
import CampaignState from './contexts/CampaignState';

function CampaignSheetHeader() {

  // Definitions for state
  const [campaign] = useContext(CampaignState);

  //  <h1>{campaign.charaName}</h1>
  return (
    <div>
    </div>);
}

export default CampaignSheetHeader;
