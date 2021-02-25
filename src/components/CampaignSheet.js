import React from 'react';
import { useParams } from "react-router";

function CampaignSheet() {

  // retrieve URL parameters for usage
  const { campaignURL } = useParams();

  return (
      <h1>Oops! "{campaignURL}" Campaign Page not found!</h1>
    );
}

export default CampaignSheet;
