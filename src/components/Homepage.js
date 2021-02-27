import React, {useState, useEffect} from 'react';
import * as FirebaseService from '../services/firebase';
import {Link} from 'react-router-dom';
import CreateCampaign from './CreateCampaign'

function Homepage() {

  // Definitions for state
  const [campaigns, setCampaigns] = useState({});
  const [show, setShow] = useState(false);

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

  const deleteCampaign = (campaignName) => {
    if (campaignName) { //don't save unless details present
      FirebaseService.deleteCampaign(campaignName)
      .then(() => {
        console.info('Deleted Campaign:', campaignName);
      })
      .catch((error) => {
        alert("Failed to delete campaign, see console error");
        console.error("Error deleting document:", error);
      });
    } else {
      alert('Cannot delete blank campaign');
    }
  }

  console.log("Campaigns State:", campaigns)

  return (<div>
    <br/>
    <h1>WELCOME!</h1>
    <table>
      <thead>
        <tr>
          <th colSpan="2">CAMPAIGNS</th>
        </tr>
      </thead>
      <tbody>
        {
          campaigns.campaigns && campaigns.campaigns.map((campaign, index) => {
            return (<tr key={index}>
              <td>
              <Link to={"/dw-react/" + campaign.id}>{campaign.id}</Link>
              </td>
              <td>
                <button onClick={() => deleteCampaign(campaign.id)}>Delete</button>
              </td>
            </tr>)
          })
        }</tbody>
    </table>
    {show
      ? <CreateCampaign/>
      : <button onClick={() => setShow(true)}>Create Campaign</button>
    }
  </div>);
}

export default Homepage;
