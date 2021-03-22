import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import {
  Button,
  Checkbox,
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
  resetButton: {
    marginRight: theme.spacing(1),
  },
  cancelButton: {
    marginRight: theme.spacing(1),
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
    'Choose Race & Move',
    'Select Gear',
    'Select Class Moves',
    'Add Bonds',
  ];
}

export default function CampaignDetails() {
  const classes = useStyles();
  const history = useHistory();
  const { currentUser } = useContext(AuthState);
  const { campaignURL } = useParams();
  const [charaName, setCharaName] = useState('');
  const [charaFullName, setCharaFullName] = useState('');
  const [charaClass, setCharaClass] = useState('');
  const [charaRace, setCharaRace] = useState('');
  const [charaAlignment, setCharaAlignment] = useState('');
  const [charaRaceMove, setCharaRaceMove] = useState('');
  const [charaMoveOption, setCharaMoveOption] = useState([]);
  const [charaGearOptions, setCharaGearOptions] = useState([]);
  const [charaBonds, setCharaBonds] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(false);
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
      // Add to array
      // Copying the old array and adding item
      const newBonds = [...charaBonds, target.name];
      // Set array back
      setCharaBonds(newBonds);
    } else {
      // Remove from array
      // Copying the old array
      let newBonds = charaBonds.filter((bond) => bond !== target.name);
      // Set array back
      setCharaBonds(newBonds);
    }
  };

  const clearAttributes = () => {
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceMove('');
    setCharaBonds([]);
    setCharaMoveOption([]);
    setCharaGearOptions([]);
    setCharaFullName('');
    setActiveStep(0);
  };

  const handleReset = () => {
    clearAttributes();
  };

  const handleCancel = () => {
    history.push('/dw-react/' + campaignURL);
  };

  const handleSave = () => {
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

  function gearDescription(gear) {
    let description = '';
    let count = 0;

    gear.map((input) => {
      let weight = '';
      let uses = '';
      let tags = '';
      let attributes = '';
      let item_description = '';
      // Stripping leading number and spaces
      const singleInput = input.replace(/^\d*x /, '');

      const item = items.find((x) => x.name === singleInput);
      if (item) {
        if (Number.isFinite(item.weight)) {
          weight = item.weight + ' weight';
        }
        if (Number.isFinite(item.uses)) {
          uses = item.uses + ' uses';
        }
        if (item.tags) {
          tags = item.tags.join(', ');
        }
        attributes = [uses, tags, weight].filter(Boolean).join(', ');
        if (attributes) {
          item_description = input + ' (' + attributes + ')';
        } else {
          item_description = input;
        }
      } else if (singleInput === 'Coins') {
        item_description = input;
      } else {
        item_description = input + ' (NON STANDARD ITEM - NEEDS TO BE FIXED)';
      }

      if (count === 0) {
        description = item_description;
      } else {
        description = description + ' and ' + item_description;
      }
      count = count + 1;

      return description;
    });
    return description;
  }

  function addCharaGearOptions(option, index) {
    const newGear = [...charaGearOptions];
    newGear[index] = option;
    setCharaGearOptions(newGear);
  }

  function addCharaGearMultiOptions(checked, option, index) {
    setError(true);
    let newGear = [...charaGearOptions];
    if (!newGear[index]) {
      newGear[index] = [];
    }
    newGear[index][option] = checked;
    setCharaGearOptions(newGear); // set array back
    if (
      charaGearOptions[index] &&
      charaGearOptions[index].filter((v) => v === true).length ===
        class_details[charaClass].starting_gear_options[index].multiplicity
    ) {
      setError(false);
    } else {
      setError(true);
    }
  }

  const gearOptions = () => {
    const gearChoices = class_details[charaClass].starting_gear_options;
    if (gearChoices.length > 0) {
      const output = gearChoices.map((gearChoice, index) => {
        const choiceGroup = index;
        if (gearChoice.multiplicity === 1) {
          return (
            <React.Fragment key={choiceGroup}>
              <FormControl
                key={'gearChoiceGroup' + choiceGroup}
                component='fieldset'
                className={classes.formControl}>
                <FormLabel component='legend'>Choose 1:</FormLabel>
                <RadioGroup
                  aria-label='starting gear choice'
                  name='starting gear choice'
                  value={charaGearOptions[choiceGroup] || null}
                  onChange={(event) => {
                    addCharaGearOptions(event.target.value, choiceGroup);
                  }}>
                  {gearChoice.options.map((gear, index) => {
                    const option = index;
                    return (
                      <FormControlLabel
                        key={'option' + option}
                        value={option.toString()}
                        control={<Radio />}
                        label={gearDescription(gear)}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={choiceGroup}>
              <FormControl
                key={'gearChoiceGroup' + choiceGroup}
                component='fieldset'
                className={classes.formControl}>
                <FormLabel component='legend'>
                  Choose {gearChoice.multiplicity}:
                </FormLabel>
                <FormGroup>
                  {gearChoice.options.map((gear, index) => {
                    const option = index;
                    return (
                      <FormControlLabel
                        key={'checkbox' + option}
                        control={
                          <Checkbox
                            checked={
                              charaGearOptions[choiceGroup]
                                ? !!charaGearOptions[choiceGroup][option]
                                : false
                            }
                            onChange={(event) => {
                              addCharaGearMultiOptions(
                                event.target.checked,
                                option,
                                choiceGroup
                              );
                            }}
                          />
                        }
                        label={gearDescription(gear)}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </React.Fragment>
          );
        }
      });
      return output;
    } else {
      return <p>No move choices to make</p>;
    }
  };

  function gearNext() {
    if (
      charaGearOptions &&
      charaGearOptions.length ===
        class_details[charaClass].starting_gear_options.length &&
      !charaGearOptions.includes(null) &&
      !charaGearOptions.includes(undefined) &&
      !error
    ) {
      return (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Next
        </Button>
      );
    } else {
      return (
        <Button disabled variant='contained' color='primary'>
          Next
        </Button>
      );
    }
  }

  function moveDescription(move) {
    const description = class_moves.find((x) => x.name === move).description;
    return description;
  }

  const moveOptions = () => {
    const moveChoices = class_details[charaClass].starting_move_options;
    if (moveChoices.length > 0) {
      return (
        <FormControl component='fieldset' className={classes.formControl}>
          <RadioGroup
            aria-label='starting move choice'
            name='starting move choice'
            value={charaMoveOption}
            onChange={(event) => setCharaMoveOption(event.target.value)}>
            {moveChoices.map((move, index) => {
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

  function moveNext() {
    const moveChoices = class_details[charaClass].starting_move_options;
    if (
      (moveChoices.length > 0 && charaMoveOption.length > 0) ||
      moveChoices.length === 0
    ) {
      return (
        <Button variant='contained' color='primary' onClick={handleNext}>
          Next
        </Button>
      );
    } else {
      return (
        <Button disabled variant='contained' color='primary'>
          Next
        </Button>
      );
    }
  }

  const saveCharacter = () => {
    if (
      campaignURL &&
      charaName &&
      charaClass &&
      charaAlignment &&
      charaRace &&
      charaRaceMove
    ) {
      // STARTING FUNDS
      let startingFunds = String(class_details[charaClass].starting_funds);

      // STARTING MOVES
      let startingMoves = class_details[charaClass].starting_moves;
      if (charaMoveOption.length > 0) {
        startingMoves = [...startingMoves, charaMoveOption];
      }
      startingMoves = startingMoves.map((move) => {
        return class_moves.find((x) => x.name === move);
      });

      // STARTING GEAR
      let startingGear = class_details[charaClass].starting_gear;
      let gearChoices = charaGearOptions.map((choice, index) => {
        const choiceGroup = index;
        let item = '';
        // Lookup gear choices
        if (Array.isArray(choice)) {
          // For multi-choice options cycle through and for true vals pick option
          choice.map((option, index) => {
            if (option) {
              item =
                class_details[charaClass].starting_gear_options[choiceGroup]
                  .options[index];
            }
            return item;
          });
        } else {
          item =
            class_details[charaClass].starting_gear_options[choiceGroup]
              .options[choice];
        }
        return item;
      });
      // Flatten array of choices and add to starting Gear
      startingGear = startingGear.concat(gearChoices.flat());
      // Converting gear into actual items and adding checkboxes
      startingGear = startingGear.map((item) => {
        // Stripping leading number and spaces for multiple items
        const singleItem = item.replace(/^\d*x /, '');

        if (singleItem === 'Coins') {
          // If item is a coin then add it to starting funds
          const coins = item.replace(/x Coins/, '');
          startingFunds = String(
            parseInt(startingFunds, 10) + parseInt(coins, 10)
          );
          return null;
        } else {
          if (singleItem === item) {
            // If item is a single item
            return Object.assign(
              {},
              items.find((x) => x.name === item),
              { checkbox: false }
            );
          } else {
            // If item is a multiple
            const ammount = item.match(/^\d*/);
            let singleObject = Object.assign(
              {},
              items.find((x) => x.name === singleItem),
              { checkbox: false }
            );
            singleObject.uses = singleObject.uses * ammount;
            singleObject.cost = singleObject.cost * ammount;
            singleObject.weight = singleObject.weight * ammount;
            return singleObject;
          }
        }
      });

      //console.log('startingFunds:', startingFunds);
      //console.log('startingMoves:', startingMoves);
      //console.log('startingGear:', startingGear);

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
          history.push('/dw-react/' + campaignURL + '/' + charaName);
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
                      setCharaGearOptions([]);
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
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
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
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
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
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
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
                <p
                  dangerouslySetInnerHTML={{
                    __html: class_details[charaClass].starting_gear_details,
                  }}
                />
                {gearOptions()}
              </Typography>
            </div>
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {gearNext()}
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
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}>
              Back
            </Button>
            {moveNext()}
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
            <Button onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
            <Button onClick={handleReset} className={classes.resetButton}>
              Reset
            </Button>
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
  );
}