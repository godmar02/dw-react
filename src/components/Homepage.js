import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import CreateCampaign from 'components/CreateCampaign';
import CreateCampaignState from 'components/contexts/CreateCampaignState';
import { Add, Delete } from '@material-ui/icons';
import {Breadcrumbs} from '@material-ui/core';

function Homepage() {

  // Definitions for state
  const [campaigns, setCampaigns] = useState({});
  const [show, setShow] = useState(false);
  const toggleSetShow = () => setShow(!show);

  // Use an effect hook to subscribe to the campaign stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    const unsubscribe = FirebaseService.streamCampaigns({
      next: querySnapshot => {
        const updatedCampaignList = querySnapshot.docs.map((docSnapshot) => {
          return ({id: docSnapshot.id, owner: docSnapshot.data().owner})
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
      FirebaseService.deleteCampaign(campaignName).then(() => {
        console.info('Deleted Campaign:', campaignName);
      }).catch((error) => {
        alert("Failed to delete campaign, see console error");
        console.error("Error deleting document:", error);
      });
    } else {
      alert('Cannot delete blank campaign');
    }
  }

  console.log("Campaigns State:", campaigns)

  return (
    <CreateCampaignState.Provider value={[show, setShow]}>
    <div>
    <Breadcrumbs><Link to="/dw-react">Home</Link></Breadcrumbs>
    <h1>Campaign Homepage</h1>
    <table>
      <thead>
        <tr>
          <th colSpan="2">CAMPAIGNS</th>
          <th>
            <Add onClick={() => toggleSetShow()}/>
          </th>
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
                ({campaign.owner})
              </td>
              <td>
                <Delete onClick={() => deleteCampaign(campaign.id)} />
              </td>
            </tr>)
          })
        }</tbody>
    </table>
      {
        show
          ? <CreateCampaign/>
          : null
      }
    </div>
    </CreateCampaignState.Provider>
);
}

export default Homepage;
