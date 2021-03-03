import React, {useState, useEffect, useMemo} from 'react';
import * as FirebaseService from 'services/firebase';
import HomepageHeader from 'components/homepage/HomepageHeader';
import HomepageDetails from 'components/homepage/HomepageDetails';
import HomepageState from 'components/contexts/HomepageState';

function Homepage() {

  // Definitions for state
  const [campaigns, setCampaigns] = useState({});

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

  useEffect(() => {
    console.log("Campaigns State:", campaigns)
  }, [campaigns]); //Only log to console if state actually changes

  const ctx = useMemo(() => ({campaigns}), [campaigns]); //Memo-ised state for performance

  return (<HomepageState.Provider value={ctx}>
    <HomepageHeader/>
    <br/>
    <HomepageDetails/>
  </HomepageState.Provider>);
}

export default Homepage;
