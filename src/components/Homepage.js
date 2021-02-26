import React, {useState, useEffect} from 'react';
import * as FirebaseService from '../services/firebase';
import {Link} from 'react-router-dom';

function Homepage() {

  // Definitions for state
  const [campaigns, setCampaigns] = useState({});

  // Use an effect hook to subscribe to the campaign stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    const unsubscribe = FirebaseService.streamCampaigns({
      next: querySnapshot => {
        const updatedCampaignList = querySnapshot.docs.map((docSnapshot) => {
          return ({id: docSnapshot.id})
        });
        setCampaigns(campaign => ({campaigns: updatedCampaignList}));
      },
      error: (error) => {
        alert("Failed to load data correctly, see console error");
        console.error("Error loading data:", error);
      }
    });
    return unsubscribe;
  }, [setCampaigns]);

  console.log("campaigns state:", campaigns)

  return (<div>
    <br/>
    <h1>WELCOME!</h1>
    <table>
      <thead>
        <tr>
          <th>CAMPAIGNS</th>
        </tr>
      </thead>
      <tbody>
        {
          campaigns.campaigns && campaigns.campaigns.map((campaign, index) => {
            return (<tr key={index}>
              <Link to={"/dw-react/" + campaign.id}>{campaign.id}</Link>
            </tr>)
          })
        }</tbody>
    </table>
  </div>);
}

export default Homepage;
