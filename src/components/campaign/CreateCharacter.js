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
import { dw_classes } from 'data/dwClasses';
import { items } from 'data/items';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
    'Choose Class & Alignment',
    'Create Name',
    'Choose Race & Race Move',
    'Select Gear',
    'Select Class Moves',
    'Add Bonds',
  ];
}

export default function CampaignDetails() {
  const classes = useStyles();
  const { open, setOpen } = useContext(CreateCharacterState);
  const [charaName, setCharaName] = useState('');
  const [charaFullName, setCharaFullName] = useState('');
  const [charaClass, setCharaClass] = useState('');
  const [charaRace, setCharaRace] = useState('');
  const [charaAlignment, setCharaAlignment] = useState('');
  const [charaRaceMove, setCharaRaceMove] = useState('');
  const [charaBonds, setCharaBonds] = useState([]);
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

  const handleBondChange = (event) => {
    let target = event.target;
    if (target.checked) {
      //add to array
      const newBonds = [...charaBonds, target.name]; // copying the old array and adding item
      setCharaBonds(newBonds); // set array back
    } else {
      //remove from array
      let newBonds = charaBonds.filter((bond) => bond !== target.name); // copying the old array
      setCharaBonds(newBonds); // set array back
    }
  };

  const handleCancel = () => {
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceMove('');
    setCharaBonds([]);
    setCharaFullName('');
    setActiveStep(0);
    setOpen(false);
  };

  const handleSave = () => {
    saveCharacter();
    handleCancel();
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

  const suggestedNames = () => {
    if (charaClass) {
      return class_details[charaClass].suggested_names;
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

  const saveCharacter = () => {
    if (
      campaignURL &&
      charaName &&
      charaClass &&
      charaAlignment &&
      charaRace &&
      charaRaceMove
    ) {
      const startingFunds = String(class_details[charaClass].starting_funds);
      const startingMoves = class_details[charaClass].starting_moves;
      const startingGear = class_details[charaClass].starting_gear.map(
        (item) =>
          Object.assign(
            {},
            items.find((x) => x.name === item),
            { checkbox: false }
          ) // Finding Item and adding blank checkbox
      );

      // SAVE FUNCTION
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
        bonds: charaBonds,
        class_features: [],
        dw_class: charaClass,
        full_name: charaFullName,
        funds: startingFunds,
        hp: '',
        items: startingGear,
        level: '1',
        look: '',
        moves: startingMoves,
        owner: currentUser.email,
        race: charaRace,
        race_move: charaRaceMove,
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
            <FormControl variant='outlined' className={classes.formControl}>
              <InputLabel>Class</InputLabel>
              <Select
                label='Class'
                value={charaClass}
                name='class'
                onChange={(event) => {
                  setCharaAlignment('');
                  setCharaClass(event.target.value);
                }}>
                {dw_classes.map((data, index) => {
                  return (
                    <MenuItem value={data} key={index}>
                      {data}
                    </MenuItem>
                  );
                })}
              </Select>
              <p dangerouslySetInnerHTML={{ __html: classDescription() }} />
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
                  class_details[charaClass].alignments.map((data, index) => {
                    return (
                      <MenuItem value={data.alignment} key={index}>
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
          <>
            <TextField
              autoFocus={true}
              margin='dense'
              id='name'
              label='Character Name'
              placeholder='Your characters full name, titles and all'
              fullWidth
              onChange={(event) => setCharaFullName(event.target.value)}
            />
            <TextField
              autoFocus={false}
              margin='dense'
              id='name'
              label='Short Character Name'
              placeholder='Your characters preferred name'
              fullWidth
              onChange={(event) => setCharaName(event.target.value)}
            />
            <p>Suggested Names: </p>
            <p dangerouslySetInnerHTML={{ __html: suggestedNames() }} />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              autoFocus={true}
              margin='dense'
              id='name'
              label='Race'
              placeholder='e.g. Dwarf, Elf, Goblin, Halfling, Human'
              fullWidth
              onChange={(event) => setCharaRace(event.target.value)}
            />
            <br />
            <FormControl component='fieldset' className={classes.formControl}>
              <RadioGroup
                aria-label='race move'
                name='race move'
                value={charaRaceMove}
                onChange={(event) => setCharaRaceMove(event.target.value)}>
                {charaClass &&
                  class_details[charaClass].race_moves.map((data, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={data.move}
                        control={<Radio />}
                        label={data.move + ' (' + data.race + ')'}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </>
        );
      case 3:
        return <p dangerouslySetInnerHTML={{ __html: gearDetails() }} />;
      case 4:
        return 'Class Move Choices!';
      case 5:
        return (
          <div className={classes.root}>
            <FormControl component='fieldset' className={classes.formControl}>
              <FormLabel component='legend'>
                Choose some optionally suggested bonds or you can create your
                own!
              </FormLabel>
              <FormGroup>
                {charaClass &&
                  class_details[charaClass].suggested_bonds.map(
                    (data, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          control={
                            <Checkbox
                              key={index}
                              onChange={handleBondChange}
                              color='primary'
                              name={data}
                            />
                          }
                          label={data}
                        />
                      );
                    }
                  )}
              </FormGroup>
            </FormControl>
          </div>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  function nextButtons(stepIndex) {
    if (stepIndex === steps.length - 1) {
      if (
        campaignURL &&
        charaName &&
        charaClass &&
        charaAlignment &&
        charaRace &&
        charaRaceMove
      ) {
        return (
          <Button variant='contained' color='primary' onClick={handleSave}>
            Create Character
          </Button>
        );
      } else {
        return (
          <Button
            disabled
            variant='contained'
            color='primary'
            onClick={handleSave}>
            Create Character
          </Button>
        );
      }
    } else {
      return (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Next
        </Button>
      );
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
              <Typography component={'span'} className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {nextButtons(activeStep)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
