import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import * as FirebaseService from 'services/firebase';
import CampaignState from 'components/contexts/CampaignState';
import { Add, Delete } from '@material-ui/icons';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
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
    <Grid className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={1}>
          {campaign.campaign &&
            campaign.campaign.map((campaign, index) => {
              return (
                <Grid item key={index}>
                  <Card className={classes.root}>
                    <CardHeader
                      action={
                        <Tooltip title='Delete'>
                          <IconButton
                            aria-label='delete'
                            onClick={() =>
                              deleteCharacter(campaignURL, campaign.character)
                            }>
                            <Delete />
                          </IconButton>
                        </Tooltip>
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
                        Level: {campaign.characterData.level}
                      </Typography>
                      <Typography variant='body1' component='p'>
                        Class: {campaign.characterData.dw_class}
                      </Typography>
                      <Typography variant='body1' component='p'>
                        Race: {campaign.characterData.race}
                      </Typography>
                      <Typography variant='body1' component='p'>
                        Alignment: {campaign.characterData.alignment}
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
                <Link to={'/dw-react/' + campaignURL + '/create-character'}>
                  <Tooltip title='Add Character'>
                    <IconButton aria-label='add'>
                      <Add />
                    </IconButton>
                  </Tooltip>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
