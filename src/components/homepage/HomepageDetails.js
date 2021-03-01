import React, {useContext,useState} from 'react';
import {Link} from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import CreateCampaign from 'components/homepage/CreateCampaign';
import CreateCampaignState from 'components/contexts/CreateCampaignState';
import HomepageState from 'components/contexts/HomepageState';
import {Add,Delete} from '@material-ui/icons';
import {IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function HomepageDetails() {

  const classes = useStyles();

  // Definitions for state
  const [campaigns] = useContext(HomepageState);
  const [show, setShow] = useState(false);
  const toggleSetShow = () => setShow(!show);

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

  return (
    <CreateCampaignState.Provider value={[show, setShow]}>
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
    </CreateCampaignState.Provider>
);
}

export default HomepageDetails;
