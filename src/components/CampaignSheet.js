import React, {useState, useEffect} from 'react';
import CampaignState from './contexts/CampaignState';
import {useParams} from "react-router";
import * as FirebaseService from '../services/firebase';
import CampaignSheetHeader from './CampaignSheetHeader';
import CampaignDetails from './CampaignDetails'

function CampaignSheet() {

  // Definitions for state
  const [campaign, setCampaign] = useState({});
  const [error, setError] = useState();

  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  // Use an effect hook to subscribe to the campaign stream and
  // automatically unsubscribe when the component unmounts.
  useEffect(() => {
    if (campaignURL) {
      const unsubscribe = FirebaseService.streamCharacterList(campaignURL, {
        next: querySnapshot => {
          const updatedCharacterList = querySnapshot.docs.map((docSnapshot) => { return(docSnapshot.data())});
          setCampaign(campaign => ({campaign: updatedCharacterList}));
        },
        error: () => setError('character-list-get-fail')
      });
      return unsubscribe;
    }
  }, [campaignURL, setCampaign]);

  console.log("error:", error);
  console.log("campaign state:", campaign);

  return (<CampaignState.Provider value={[campaign, setCampaign]}>
    <CampaignSheetHeader />
    <br/>
    <CampaignDetails/>
  </CampaignState.Provider>);
}

export default CampaignSheet;
