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
import { class_moves } from 'data/classMoves';

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
  const { currentUser } = useContext(AuthState);
  const { campaignURL } = useParams();
  const [charaName, setCharaName] = useState('');
  const [charaFullName, setCharaFullName] = useState('');
  const [charaClass, setCharaClass] = useState('');
  const [charaRace, setCharaRace] = useState('');
  const [charaAlignment, setCharaAlignment] = useState('');
  const [charaRaceMove, setCharaRaceMove] = useState('');
  const [charaMoveOption, setCharaMoveOption] = useState([]);
  const [charaGearOption, setCharaGearOption] = useState([]);
  const [charaBonds, setCharaBonds] = useState([]);
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
    setCharaMoveOption([]);
    setCharaGearOption([]);
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
    return class_details[charaClass].suggested_names;
  };

  const gearOptions = () => {
    const gear = class_details[charaClass].starting_gear_details;
    //const gear_options = class_details[charaClass].starting_gear_options;
    return <p dangerouslySetInnerHTML={{ __html: gear }} />;
  };

  function moveDescription(move) {
    const description = class_moves.find((x) => x.name === move).description;
    return description;
  }

  const moveOptions = () => {
    const moves = class_details[charaClass].starting_move_options;
    if (moves.length > 0) {
      return (
        <FormControl component='fieldset' className={classes.formControl}>
          <RadioGroup
            aria-label='starting move choice'
            name='starting move choice'
            value={charaMoveOption}
            onChange={(event) => setCharaMoveOption(event.target.value)}>
            {moves.map((move, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={move}
                  control={<Radio />}
                  label={move + ' - ' + moveDescription(move)}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      );
    } else {
      return <p>No move choices to make</p>;
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
      let startingMoves = class_details[charaClass].starting_moves;
      if (charaMoveOption.length > 0) {
        startingMoves = [...startingMoves, charaMoveOption];
      }
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
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel>Class</InputLabel>
                  <Select
                    label='Class'
                    value={charaClass}
                    name='class'
                    onChange={(event) => {
                      setCharaAlignment('');
                      setCharaMoveOption([]);
                      setCharaBonds([]);
                      setCharaGearOption([]);
                      setCharaRaceMove('');
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
                      class_details[charaClass].alignments.map(
                        (data, index) => {
                          return (
                            <MenuItem value={data.alignment} key={index}>
                              {data.alignment}
                            </MenuItem>
                          );
                        }
                      )}
                  </Select>
                  <p
                    dangerouslySetInnerHTML={{ __html: alignmentAttribute() }}
                  />
                </FormControl>
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {charaClass && charaAlignment ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button disabled variant='contained' color='primary'>
                Next
              </Button>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                <TextField
                  autoFocus={true}
                  margin='dense'
                  id='full name'
                  label='Character Name'
                  placeholder="Your character's full name, titles and all"
                  value={charaFullName}
                  fullWidth
                  onChange={(event) => setCharaFullName(event.target.value)}
                />
                <TextField
                  autoFocus={false}
                  margin='dense'
                  id='name'
                  label='Short Character Name'
                  placeholder="Your character's preferred name"
                  value={charaName}
                  fullWidth
                  onChange={(event) => setCharaName(event.target.value)}
                />
                <p>Suggested Names: </p>
                <p dangerouslySetInnerHTML={{ __html: suggestedNames() }} />
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {charaName && charaFullName ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button disabled variant='contained' color='primary'>
                Next
              </Button>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                <TextField
                  autoFocus={true}
                  margin='dense'
                  id='race'
                  label='Race'
                  value={charaRace}
                  placeholder='e.g. Dwarf, Elf, Goblin, Halfling, Human'
                  fullWidth
                  onChange={(event) => setCharaRace(event.target.value)}
                />
                <br />
                <FormControl
                  component='fieldset'
                  className={classes.formControl}>
                  <RadioGroup
                    aria-label='race move'
                    name='race move'
                    value={charaRaceMove}
                    onChange={(event) => setCharaRaceMove(event.target.value)}>
                    {charaClass &&
                      class_details[charaClass].race_moves.map(
                        (data, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              value={data.move}
                              control={<Radio />}
                              label={data.move + ' (' + data.race + ')'}
                            />
                          );
                        }
                      )}
                  </RadioGroup>
                </FormControl>
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {charaRace && charaRaceMove ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button disabled variant='contained' color='primary'>
                Next
              </Button>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                {gearOptions()}
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {charaClass && charaAlignment ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button disabled variant='contained' color='primary'>
                Next
              </Button>
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                {moveOptions()}
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {charaMoveOption ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button disabled variant='contained' color='primary'>
                Next
              </Button>
            )}
          </div>
        );
      case 5:
        return (
          <div>
            <div>
              <Typography component={'span'} className={classes.instructions}>
                <div className={classes.root}>
                  <FormControl
                    component='fieldset'
                    className={classes.formControl}>
                    <FormLabel component='legend'>
                      Choose some optionally suggested bonds or you can create
                      your own!
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
              </Typography>
            </div>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {campaignURL ? (
              <Button variant='contained' color='primary' onClick={handleSave}>
                Create Character
              </Button>
            ) : (
              <Button
                disabled
                variant='contained'
                color='primary'
                onClick={handleSave}>
                Create Character
              </Button>
            )}
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
          <div>{getStepContent(activeStep)}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
