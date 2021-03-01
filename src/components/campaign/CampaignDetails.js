import React, {useContext,useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import CreateCharacter from 'components/campaign/CreateCharacter';
import CreateCharacterState from 'components/contexts/CreateCharacterState';
import CampaignState from 'components/contexts/CampaignState';
import {Add,Delete} from '@material-ui/icons';
import {IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function CampaignDetails() {

  const classes = useStyles();

  // State Variables
  const [campaign] = useContext(CampaignState);
  const [show, setShow] = useState(false);
  const toggleSetShow = () => setShow(!show);
  // retrieve URL parameters for usage
  const {campaignURL} = useParams();

  const deleteCharacter = (campaign,character) => {
    if (campaign && character) { //don't save unless details present
      FirebaseService.deleteCharacter(campaign,character)
      .then(() => {
        console.info('Deleted Character:', character);
      })
      .catch((error) => {
        alert("Failed to delete character, see console error");
        console.error("Error deleting document:", error);
      });
    } else {
      alert('Cannot delete blank character');
    }
  }

  return (
    <CreateCharacterState.Provider value={[show, setShow]}>
      <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Character</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>HP</TableCell>
          <TableCell>XP</TableCell>
          <TableCell><IconButton aria-label="add"><Add onClick={() => toggleSetShow()}/></IconButton></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          campaign.campaign && campaign.campaign.map((campaign, index) => {
            return (
            <TableRow key={index}>
              <TableCell><Link to={"/dw-react/" + campaignURL + "/" + campaign.character}>{campaign.character}</Link></TableCell>
              <TableCell>{campaign.characterData.owner}</TableCell>
              <TableCell>{campaign.characterData.hp}</TableCell>
              <TableCell>{campaign.characterData.xp}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete">
                    <Delete onClick={() => deleteCharacter(campaignURL, campaign.character)}/>
                  </IconButton>
                </TableCell>
            </TableRow>)
          })
        }
      </TableBody>
    </Table>
  </TableContainer>
      {show
        ? <CreateCharacter/>
        : null
      }
    </CreateCharacterState.Provider>
  );
}

export default CampaignDetails;
