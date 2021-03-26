import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import HomepageState from 'components/contexts/HomepageState';
import AuthState from 'components/contexts/AuthState';
import { Add, Delete } from '@material-ui/icons';
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
  TextField,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function HomepageDetails() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthState);
  const [open, setOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const { campaigns } = useContext(HomepageState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    saveCampaign();
  };

  // Create New Campaign
  const saveCampaign = () => {
    if (campaignName) {
      //don't save unless details present
      FirebaseService.createCampaign(campaignName, currentUser.email)
        .then(() => {
          console.info('Created Campaign:', campaignName);
        })
        .catch((error) => {
          alert('Failed to create campaign, see console error');
          console.error('Error creating document:', error);
        });
    } else {
      alert('Cannot save blank campaign');
    }
  };

  // Delete Campaign
  const deleteCampaign = (campaignName) => {
    if (campaignName) {
      //don't save unless details present
      FirebaseService.deleteCampaign(campaignName)
        .then(() => {
          console.info('Deleted Campaign:', campaignName);
        })
        .catch((error) => {
          alert('Failed to delete campaign, see console error');
          console.error('Error deleting document:', error);
        });
    } else {
      alert('Cannot delete blank campaign');
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Campaign</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>
                <Tooltip title='Add Campaign'>
                  <IconButton aria-label='add' onClick={handleClickOpen}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.campaigns &&
              campaigns.campaigns.map((campaign, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Link to={'/dw-react/' + campaign.id}>{campaign.id}</Link>
                    </TableCell>
                    <TableCell>{campaign.owner}</TableCell>
                    <TableCell>
                      <Tooltip title='Delete'>
                        <IconButton
                          aria-label='delete'
                          onClick={() => deleteCampaign(campaign.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Create new campaign</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a campaign, please enter the new campaign name here. You
            will not be able to change this once saved.
          </DialogContentText>
          <TextField
            autoFocus={true}
            margin='dense'
            id='name'
            label='Campaign Name'
            fullWidth
            onChange={(event) => setCampaignName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='primary'>
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
