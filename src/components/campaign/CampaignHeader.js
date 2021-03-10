import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Breadcrumbs } from '@material-ui/core';

export default function CampaignHeader() {
  const { campaignURL } = useParams();

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link to='/dw-react'>Home</Link>
        <p>{campaignURL}</p>
      </Breadcrumbs>
      <h1>Campaign: {campaignURL}</h1>
    </div>
  );
}
