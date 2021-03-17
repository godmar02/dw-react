import React, { useContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import * as FirebaseService from 'services/firebase';
import CampaignState from 'components/contexts/CampaignState';
import CreateCharacterState from 'components/contexts/CreateCharacterState';
import CreateCharacter from 'components/campaign/CreateCharacter';
import { Add, Delete } from '@material-ui/icons';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function CampaignDetails() {
  const classes = useStyles();
  const { campaign } = useContext(CampaignState);
  const { campaignURL } = useParams();
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Delete Character
  const deleteCharacter = (campaign, character) => {
    if (campaign && character) {
      //don't save unless details present
      FirebaseService.deleteCharacter(campaign, character)
        .then(() => {
          console.info('Deleted Character:', character);
        })
        .catch((error) => {
          alert('Failed to delete character, see console error');
          console.error('Error deleting document:', error);
        });
    } else {
      alert('Cannot delete blank character');
    }
  };

  return (
    <CreateCharacterState.Provider value={ctx}>
      <Grid className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={1}>
            {campaign.campaign &&
              campaign.campaign.map((campaign, index) => {
                return (
                  <Grid item key={index}>
                    <Card className={classes.root}>
                      <CardHeader
                        action={
                          <IconButton
                            aria-label='delete'
                            onClick={() =>
                              deleteCharacter(campaignURL, campaign.character)
                            }>
                            <Delete />
                          </IconButton>
                        }
                        title={
                          <Link
                            to={
                              '/dw-react/' +
                              campaignURL +
                              '/' +
                              campaign.character
                            }>
                            {campaign.character}
                          </Link>
                        }
                        subheader={campaign.characterData.owner}
                      />
                      <CardContent>
                        <Typography variant='body1' component='p'>
                          {campaign.characterData.dw_class}
                        </Typography>
                        <Typography variant='body1' component='p'>
                          {campaign.characterData.race}
                        </Typography>
                        <Typography variant='body1' component='p'>
                          {campaign.characterData.alignment}
                        </Typography>
                        <br />
                        <Typography variant='body2' component='p'>
                          HP: {campaign.characterData.hp}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          XP: {campaign.characterData.xp}
                        </Typography>
                        <Typography variant='body2' component='p'>
                          Funds: {campaign.characterData.funds}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            <Grid item>
              <Card className={classes.root}>
                <CardHeader title='Add Character' />
                <CardContent>
                  <IconButton aria-label='add' onClick={handleClickOpen}>
                    <Add />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CreateCharacter />
    </CreateCharacterState.Provider>
  );
}
