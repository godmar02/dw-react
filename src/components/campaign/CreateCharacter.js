import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import CreateCharacterState from 'components/contexts/CreateCharacterState';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { class_details } from 'data/classDetails';
import { dw_classes } from 'data/classList';
import { races } from 'data/raceList';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CampaignDetails() {
  const classes = useStyles();
  const { open, setOpen } = useContext(CreateCharacterState);
  const [charaName, setCharaName] = useState('');
  const [charaClass, setCharaClass] = useState('');
  const [charaRace, setCharaRace] = useState('');
  const [charaAlignment, setCharaAlignment] = useState('');
  const [charaRaceAttribute, setCharaRaceAttribute] = useState('');
  const { currentUser } = useContext(AuthState);
  const { campaignURL } = useParams();

  const handleRadioChange = (event) => {
    setCharaRaceAttribute(event.target.value);
  };

  const handleCancel = () => {
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceAttribute('');
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    saveCharacter();
  };

  const alignmentAttribute = () => {
    if (charaClass && charaAlignment) {
      return class_details[charaClass].alignments.find(
        (x) => x.alignment === charaAlignment
      ).attribute;
    } else {
      return '';
    }
  };

  // Create New Character
  const saveCharacter = () => {
    if (
      campaignURL &&
      charaName &&
      charaClass &&
      charaAlignment &&
      charaRace &&
      charaRaceAttribute
    ) {
      //don't save unless details present
      FirebaseService.createCharacter(
        campaignURL,
        charaName,
        currentUser.email,
        charaClass,
        charaAlignment,
        charaRace,
        charaRaceAttribute
      )
        .then(() => {
          console.info('Created Character:', charaName);
        })
        .catch((error) => {
          alert('Failed to create character, see console error');
          console.error('Error creating document:', error);
        });
    } else {
      alert('Cannot save blank character');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Create new character</DialogTitle>{' '}
      <DialogContent>
        <DialogContentText>
          To create a character, please enter the following details. You will
          not be able to change this once saved.
        </DialogContentText>
        <TextField
          autoFocus={true}
          margin='dense'
          id='name'
          label='Short Character Name'
          fullWidth
          onChange={(event) => setCharaName(event.target.value)}
        />
        <br />
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Class</InputLabel>
          <Select
            label='Class'
            value={charaClass}
            name='class'
            onChange={(event) => setCharaClass(event.target.value)}>
            {dw_classes.map((data, key) => {
              return (
                <MenuItem value={data} key={key}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Race</InputLabel>
          <Select
            label='Race'
            value={charaRace}
            name='race'
            onChange={(event) => setCharaRace(event.target.value)}>
            {races.map((data, key) => {
              return (
                <MenuItem value={data} key={key}>
                  {data}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Alignment</InputLabel>
          <Select
            label='Alignment'
            value={charaAlignment}
            name='alignment'
            onChange={(event) => setCharaAlignment(event.target.value)}>
            {charaClass &&
              class_details[charaClass].alignments.map((data, key) => {
                return (
                  <MenuItem value={data.alignment} key={key}>
                    {data.alignment}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        {
          <TextField
            multiline
            fullWidth
            variant='outlined'
            aria-label='empty textarea'
            name='alignmentAttribute'
            InputProps={{
              readOnly: true,
            }}
            value={alignmentAttribute()}
          />
        }
        <br />
        <FormControl component='fieldset' className={classes.formControl}>
          <FormLabel component='legend'>Race Attribute</FormLabel>
          <RadioGroup
            aria-label='race attribute'
            name='race attribute'
            value={charaRaceAttribute}
            onChange={handleRadioChange}>
            {charaClass &&
              class_details[charaClass].race_attributes.map((data, key) => {
                return (
                  <FormControlLabel
                    value={data.attribute}
                    control={<Radio />}
                    label={data.attribute + ' (' + data.race + ')'}
                  />
                );
              })}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleSave} color='primary'>
          Create Character
        </Button>
      </DialogActions>
    </Dialog>
  );
}
