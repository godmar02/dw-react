import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import CampaignState from 'components/contexts/CampaignState';
import {Add, Delete} from '@material-ui/icons';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  TextField
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function CampaignDetails() {

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

  return (<>
    <Grid container spacing={3}>
        {
            campaign.campaign && campaign.campaign.map((campaign, index) => {
              return (
                <Grid item xs={3} key={index}>
                <Card className={classes.root} >
                  <CardHeader
                     action={
                       <IconButton aria-label="delete" onClick={() => deleteCharacter(campaignURL, campaign.character)}>
                         <Delete />
                       </IconButton>
                     }
                     title={<Link to={"/dw-react/" + campaignURL + "/" + campaign.character}>{campaign.character}</Link>}
                     subheader={campaign.characterData.owner}/>
                  <CardContent>
                    <Typography variant="body1" component="p">{campaign.characterData.dwClass}</Typography>
                    <Typography variant="body1" component="p">{campaign.characterData.race}</Typography>
                    <Typography variant="body1" component="p">{campaign.characterData.alignment}</Typography>
                    <br/>
                    <Typography variant="body2" component="p">HP: {campaign.characterData.hp}</Typography>
                    <Typography variant="body2" component="p">XP: {campaign.characterData.xp}</Typography>
                  </CardContent>
                </Card>
              </Grid>)
            })
          }

          <Grid item xs={3}>
          <Card className={classes.root}>
            <CardHeader title="Add Character"/>
            <CardContent>
              <IconButton aria-label="add" onClick={handleClickOpen}>
                <Add />
              </IconButton>
            </CardContent>
          </Card>
          </Grid>

        </Grid>
    <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new character</DialogTitle > <DialogContent>
        <DialogContentText>
          To create a character, please enter the new character name here. You will not be able to change this once saved.
        </DialogContentText>
        <TextField autoFocus={true} margin="dense" id="name" label="Short Character Name" fullWidth onChange={event => setCharaName(event.target.value)}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Create Character
        </Button>
      </DialogActions>
    </Dialog>
  </>);
}
