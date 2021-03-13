import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import CreateCharacterState from 'components/contexts/CreateCharacterState';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  Stepper,
  StepLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { class_details } from 'data/classDetails';
import { dw_classes } from 'data/classList';
import { races } from 'data/raceList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Choose',
    'Select Race Attribute',
    'Select Gear',
    'Select Moves',
    'Select Bonds',
  ];
}

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
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRadioChange = (event) => {
    setCharaRaceAttribute(event.target.value);
  };

  const handleCancel = () => {
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceAttribute('');
    setActiveStep(0);
    setOpen(false);
  };

  const handleSave = () => {
    saveCharacter();
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceAttribute('');
    setOpen(false);
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

  const classDescription = () => {
    if (charaClass) {
      return class_details[charaClass].description;
    } else {
      return '';
    }
  };

  const gearDetails = () => {
    if (charaClass) {
      return class_details[charaClass].gear_details;
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
      let startingMoves = class_details[charaClass].moves.filter(
        (x) => x.level === 'starting'
      );
      startingMoves = startingMoves.map((moves) => moves.name);

      //don't save unless details present
      FirebaseService.saveCharacter(campaignURL, charaName, {
        abilities: [
          { category: 'STR', score: '1', affliction: 'Unafflicted' },
          { category: 'DEX', score: '1', affliction: 'Unafflicted' },
          { category: 'CON', score: '1', affliction: 'Unafflicted' },
          { category: 'INT', score: '1', affliction: 'Unafflicted' },
          { category: 'WIS', score: '1', affliction: 'Unafflicted' },
          { category: 'CHA', score: '1', affliction: 'Unafflicted' },
        ],
        alignment: charaAlignment,
        armour: '0',
        backstory: '',
        bonds: [{ bond: '' }],
        class_features: [{ feature: '', checkbox: false }],
        dw_class: charaClass,
        full_name: '',
        funds: '0',
        hp: '',
        items: [
          {
            name: '',
            description: '',
            type: '',
            range: '',
            cost: '',
            weight: '',
            uses: '',
            tags: [],
          },
        ],
        level: '1',
        look: '',
        moves: startingMoves,
        owner: currentUser.email,
        race: charaRace,
        race_attribute: charaRaceAttribute,
        xp: '0',
      })
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

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
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
              <p dangerouslySetInnerHTML={{ __html: classDescription() }} />
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
              <p dangerouslySetInnerHTML={{ __html: alignmentAttribute() }} />
            </FormControl>
          </>
        );
      case 1:
        return (
          <FormControl component='fieldset' className={classes.formControl}>
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
        );
      case 2:
        return <p dangerouslySetInnerHTML={{ __html: gearDetails() }} />;
      case 3:
        return 'This is the bit I really care about!';
      case 4:
        return (
          <div className={classes.root}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend'>
                Choose some optionally suggested bonds
              </FormLabel>
              <FormGroup>
                {charaClass &&
                  class_details[charaClass].suggested_bonds.map((data) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            //checked={gilad}
                            //onChange={handleChange}
                            name={data}
                          />
                        }
                        label={data}
                      />
                    );
                  })}
              </FormGroup>
            </FormControl>
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogContent>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant='contained' color='primary' onClick={handleSave}>
                Create Character
              </Button>
            ) : (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
