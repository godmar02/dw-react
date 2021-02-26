import React from 'react';
import {Link} from 'react-router-dom';
import {useParams} from "react-router";

function CampaignSheetHeader() {

  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  return (<div>
    <Link to="/dw-react">Home</Link> >
    <p>{campaignURL}</p>
    <h1>{campaignURL}
    </h1>
  </div>);
}

export default CampaignSheetHeader;
