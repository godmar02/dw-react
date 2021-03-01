import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import CampaignState from 'components/contexts/CampaignState';
import CampaignHeader from 'components/campaign/CampaignHeader';
import CampaignDetails from 'components/campaign/CampaignDetails';

function CampaignSheet() {

  // Definitions for state
  const [campaign, setCampaign] = useState({});

  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  // Use an effect hook to subscribe to the campaign stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    if (campaignURL) {
      const unsubscribe = FirebaseService.streamCharacters(campaignURL, {
        next: querySnapshot => {
          //const updatedCharacterList = querySnapshot.docs.map((docSnapshot) => { return(docSnapshot.data())});
          const updatedCharacterList = querySnapshot.docs.map((docSnapshot) => { return({character: docSnapshot.id , characterData: docSnapshot.data()})});
          setCampaign(campaign => ({campaign: updatedCharacterList}));
        },
        error: (error) => {
          alert("Failed to load campaign data correctly, see console error");
          console.error("Error loading document:", error);
        }
      });
      return unsubscribe;
    }
  }, [campaignURL, setCampaign]);

  console.info("Campaign State:", campaign);

  return (
  <CampaignState.Provider value={[campaign, setCampaign]}>
    <CampaignHeader/>
    <br/>
    <CampaignDetails/>
  </CampaignState.Provider>);
}

export default CampaignSheet;