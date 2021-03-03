import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import CampaignState from 'components/contexts/CampaignState';
import {Add, Delete} from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function CampaignDetails() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {campaign} = useContext(CampaignState);
  const [charaName, setCharaName] = useState("");
  const {currentUser} = useContext(AuthState);
  const {campaignURL} = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    saveCharacter();
  }

  // Create New Character
  const saveCharacter = () => {
    if (campaignURL && charaName) { //don't save unless details present
      FirebaseService.createCharacter(campaignURL, charaName, currentUser.email).then(() => {
        console.info('Created Character:', charaName);
      }).catch((error) => {
        alert("Failed to create character, see console error");
        console.error("Error creating document:", error);
      });
    } else {
      alert('Cannot save blank character');
    }
  }

  // Delete Character
  const deleteCharacter = (campaign, character) => {
    if (campaign && character) { //don't save unless details present
      FirebaseService.deleteCharacter(campaign, character).then(() => {
        console.info('Deleted Character:', character);
      }).catch((error) => {
        alert("Failed to delete character, see console error");
        console.error("Error deleting document:", error);
      });
    } else {
      alert('Cannot delete blank character');
    }
  }

  return (<> < TableContainer component = {
    Paper
  } > <Table className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Character</TableCell>
        <TableCell>Owner</TableCell>
        <TableCell>HP</TableCell>
        <TableCell>XP</TableCell>
        <TableCell>
          <IconButton aria-label="add" onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        campaign.campaign && campaign.campaign.map((campaign, index) => {
          return (<TableRow key={index}>
            <TableCell>
              <Link to={"/dw-react/" + campaignURL + "/" + campaign.character}>{campaign.character}</Link>
            </TableCell>
            <TableCell>{campaign.characterData.owner}</TableCell>
            <TableCell>{campaign.characterData.hp}</TableCell>
            <TableCell>{campaign.characterData.xp}</TableCell>
            <TableCell>
              <IconButton aria-label="delete" onClick={() => deleteCharacter(campaignURL, campaign.character)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>)
        })
      }
    </TableBody>
  </Table> < /TableContainer>
<Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">Create new character</DialogTitle > <DialogContent>
    <DialogContentText>
      To create a character, please enter the new character name here. You will not be able to change this once saved.
    </DialogContentText>
    <TextField autoFocus="autoFocus" margin="dense" id="name" label="Short Character Name" fullWidth="fullWidth" onChange={event => setCharaName(event.target.value)}/>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCancel} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSave} color="primary">
      Create Character
    </Button>
  </DialogActions> < /Dialog>
</ >);
}

export default CampaignDetails;
