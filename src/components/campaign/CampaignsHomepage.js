import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import CreateCampaign from 'components/campaign/CreateCampaign';
import CreateCampaignState from 'components/contexts/CreateCampaignState';
import {Add,Delete} from '@material-ui/icons';
import {Breadcrumbs,IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CampaignsHomepage() {

  const classes = useStyles();

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
    <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Campaign</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>
            <IconButton aria-label="add">
            <Add onClick={() => toggleSetShow()}/>
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          campaigns.campaigns && campaigns.campaigns.map((campaign, index) => {
            return (<TableRow key={index}>
              <TableCell>
                <Link to={"/dw-react/" + campaign.id}>{campaign.id}</Link>
              </TableCell>
              <TableCell>
                {campaign.owner}
              </TableCell>
              <TableCell>
                <IconButton aria-label="delete"><Delete onClick={() => deleteCampaign(campaign.id)} />
                </IconButton>
              </TableCell>
            </TableRow>)
          })
        }
      </TableBody>
    </Table>
  </TableContainer>
      {
        show
          ? <CreateCampaign/>
          : null
      }
    </div>
    </CreateCampaignState.Provider>
);
}

export default CampaignsHomepage;
