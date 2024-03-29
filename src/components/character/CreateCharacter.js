import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import * as FirebaseService from 'services/firebase';
import AuthState from 'components/contexts/AuthState';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Breadcrumbs,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Step,
  Stepper,
  StepLabel,
  TextField,
} from '@material-ui/core';
import { ExpandMore, Save } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { class_details } from 'data/classDetails';
import { dw_classes } from 'data/dwClasses';
import { items } from 'data/items';
import { ability_afflictions } from 'data/abilityAfflictions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  card: {
    minWidth: 275,
    maxWidth: 700,
  },
  abCard: {
    minWidth: 275,
    maxWidth: 800,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: 5,
    },
  },
  formControl: {
    marginTop: 5,
    marginBottom: 5,
    minWidth: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  abCardContent: {
    paddingTop: 5,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  abTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  abTextField: {
    width: 85,
  },
  abButton: {
    width: 85,
    fontSize: 11,
    fontWeight: 'bold',
  },
}));

function getSteps() {
  return [
    'Set Basic Details',
    'Select Gear',
    'Select Moves/Spells',
    'Choose Abilities',
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
  const [charaMoveOption, setCharaMoveOption] = useState('');
  const [charaSpellOptions, setCharaSpellOptions] = useState([]);
  const [charaAbilities, setCharaAbilities] = useState([
    { category: 'STR', score: '16', afflicted: false },
    { category: 'DEX', score: '15', afflicted: false },
    { category: 'CON', score: '13', afflicted: false },
    { category: 'INT', score: '12', afflicted: false },
    { category: 'WIS', score: '9', afflicted: false },
    { category: 'CHA', score: '8', afflicted: false },
  ]);
  const [charaGearOptions, setCharaGearOptions] = useState([]);
  const [charaBonds, setCharaBonds] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function clearAttributes() {
    setCharaName('');
    setCharaClass('');
    setCharaRace('');
    setCharaAlignment('');
    setCharaRaceMove('');
    setCharaBonds([]);
    setCharaMoveOption('');
    setCharaGearOptions([]);
    setCharaSpellOptions([]);
    setCharaAbilities([
      { category: 'STR', score: '8', afflicted: false },
      { category: 'DEX', score: '8', afflicted: false },
      { category: 'CON', score: '8', afflicted: false },
      { category: 'INT', score: '8', afflicted: false },
      { category: 'WIS', score: '8', afflicted: false },
      { category: 'CHA', score: '8', afflicted: false },
    ]);
    setCharaFullName('');
    setActiveStep(0);
  }

  function handleReset() {
    clearAttributes();
  }

  function handleCancel() {
    history.push('/dw-react/' + campaignURL);
  }

  function handleSave() {
    saveCharacter();
  }

  function alignmentAttribute() {
    if (charaClass && charaAlignment) {
      return class_details[charaClass].alignments.find(
        (x) => x.alignment === charaAlignment
      ).attribute;
    } else {
      return '';
    }
  }

  function classIntro() {
    if (charaClass) {
      return class_details[charaClass].intro;
    } else {
      return '';
    }
  }

  function suggestedNames() {
    return class_details[charaClass].suggested_names;
  }

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
    console.log('charaGearOptions', charaGearOptions);
    console.log('charaGearOptions.length', charaGearOptions.length);
    console.log(
      'charaGearOptions.includes(undefined)',
      charaGearOptions.includes(undefined)
    );
  }

  function addCharaGearMultiOptions(event, index) {
    let newArr = [...charaGearOptions];

    if (!newArr[index]) {
      newArr[index] = [];
    }

    if (event.currentTarget.checked) {
      newArr[index] = [...newArr[index], event.target.name];
    } else {
      newArr[index] = newArr[index].filter(
        (item) => item !== event.target.name
      );
    }

    setCharaGearOptions(newArr);
    console.log('charaGearOptions', charaGearOptions);
    console.log('charaGearOptions.length', charaGearOptions.length);
    console.log(
      'charaGearOptions.includes(undefined)',
      charaGearOptions.includes(undefined)
    );
  }

  function addCharaSpellOptions(event) {
    let newArr = [];
    if (event.currentTarget.checked) {
      newArr = [...charaSpellOptions, event.target.name];
    } else {
      newArr = charaSpellOptions.filter((spell) => spell !== event.target.name);
    }
    setCharaSpellOptions(newArr);
    console.log('charaSpellOptions', charaSpellOptions);
    console.log('charaSpellOptions.length', charaGearOptions.length);
    console.log(
      'charaSpellOptions.includes(undefined)',
      charaSpellOptions.includes(undefined)
    );
  }

  function handleBondChange(event) {
    let target = event.target;
    let newBonds = [];
    if (target.checked) {
      newBonds = [...charaBonds, target.name];
      setCharaBonds(newBonds);
    } else {
      newBonds = charaBonds.filter((bond) => bond !== target.name);
    }
    setCharaBonds(newBonds);
  }

  function updateAbilityScore(index, abScore) {
    let newAbilities = [...charaAbilities]; // copying the old array
    newAbilities[index] = {
      ...charaAbilities[index],
      score: abScore,
    }; // replace value
    setCharaAbilities(newAbilities); // set array back
  }

  function updateAbilityAfflicted(index) {
    const newAffliction = !charaAbilities[index].afflicted; //switching boolean
    let newAbilities = [...charaAbilities]; // copying the old array
    newAbilities[index] = {
      ...charaAbilities[index],
      afflicted: newAffliction,
    }; // replace value
    setCharaAbilities(newAbilities); // set array back
  }

  function gearOptions() {
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
                <FormLabel component='legend'>Choose from:</FormLabel>
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
                        control={<Radio color='primary' />}
                        label={gearDescription(gear)}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <br />
              <br />
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
                    const option = index.toString();
                    return (
                      <FormControlLabel
                        key={'checkbox' + option}
                        control={
                          <Checkbox
                            color='primary'
                            name={option}
                            onChange={(event) => {
                              addCharaGearMultiOptions(event, choiceGroup);
                            }}
                          />
                        }
                        label={gearDescription(gear)}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
              <br />
              <br />
            </React.Fragment>
          );
        }
      });
      return output;
    } else {
      return <p>No move choices to make</p>;
    }
  }

  function moveOptions() {
    const moveChoices = class_details[charaClass].moves.filter(
      (x) => x.level === 'starting' && x.selected === false
    );
    if (moveChoices.length > 0) {
      return (
        <>
          <br />
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>Choose an additional move:</FormLabel>
            <RadioGroup
              aria-label='starting move choice'
              name='starting move choice'
              value={charaMoveOption}
              onChange={(event) =>
                setCharaMoveOption(
                  event.target.value,
                  console.log('charaMoveOption.length', charaMoveOption.length)
                )
              }>
              {moveChoices.map((move, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={move.name}
                    control={<Radio color='primary' />}
                    label={move.name + ' - ' + move.description}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </>
      );
    } else {
      return null;
    }
  }

  function spellOptions() {
    if (charaClass === 'Wizard') {
      const spellChoices = class_details[charaClass].spells.filter(
        (x) => x.level === 1
      );
      return (
        <>
          <br />
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>
              Choose three first level spells to add to your spellbook:
            </FormLabel>
            <br />
            <FormGroup>
              {spellChoices.map((spell, index) => {
                let spellOngoing = '';
                if (spell.ongoing) {
                  spellOngoing = ' (Ongoing)';
                }
                let spellSchool = '';
                if (spell.school) {
                  spellSchool = ' (' + spell.school + ')';
                }
                const spellDescr =
                  spell.name +
                  spellOngoing +
                  spellSchool +
                  ' - ' +
                  spell.description;

                if (
                  charaRaceMove ===
                    'Magic is as natural as breath to you. Detect Magic is a cantrip for you.' &&
                  spell.name === 'Detect Magic'
                ) {
                  return null;
                } else {
                  return (
                    <FormControlLabel
                      key={'checkbox' + index}
                      control={
                        <Checkbox
                          color='primary'
                          name={spell.name}
                          onChange={(event) => {
                            addCharaSpellOptions(event);
                          }}
                        />
                      }
                      label={spellDescr}
                    />
                  );
                }
              })}
            </FormGroup>
          </FormControl>
        </>
      );
      /*} else if (charaClass === 'Cleric') {
      const spellChoices = class_details[charaClass].spells.filter(
        (x) => x.level === 1
      );
      return (
        <>
          <br />
          <FormControl component='fieldset' className={classes.formControl}>
            <FormLabel component='legend'>
              Choose two first level spells to additionally prepare:
            </FormLabel>
            <br />
            <FormGroup>
              {spellChoices.map((spell, index) => {
                let spellOngoing = '';
                if (spell.ongoing) {
                  spellOngoing = ' (Ongoing)';
                }
                const spellDescr =
                  spell.name + spellOngoing + ' - ' + spell.description;
                return (
                  <FormControlLabel
                    key={'checkbox' + index}
                    control={
                      <Checkbox
                        color='primary'
                        checked={
                          charaSpellOptions[index]
                            ? !!charaSpellOptions[index]
                            : false
                        }
                        onChange={(event) => {
                          addCharaSpellOptions(event.target.checked, index);
                        }}
                      />
                    }
                    label={spellDescr}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </>
      );*/
    } else {
      return null;
    }
  }

  function afflictedValue(ability, afflicted) {
    if (afflicted) {
      return ability_afflictions[ability];
    } else {
      return 'Unafflicted';
    }
  }

  function maxHp() {
    return (
      class_details[charaClass].base_hp +
      parseInt(charaAbilities.find((x) => x.category === 'CON').score, 10)
    );
  }

  function abilityModifier(abilityScore, abilityAffliction) {
    if (abilityScore) {
      let baseModifier;
      let afflicted;

      abilityScore = parseInt(abilityScore, 10);

      if ([1, 2, 3].indexOf(abilityScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(abilityScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(abilityScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(abilityScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(abilityScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(abilityScore) > -1) {
        baseModifier = 2;
      } else if (abilityScore === 18) {
        baseModifier = 3;
      }

      /* -1 if afflicted */
      if (abilityAffliction) {
        afflicted = 1;
      } else {
        afflicted = 0;
      }

      let modifier = baseModifier - afflicted;

      if (modifier > 0) {
        return '+' + modifier;
      } else {
        return modifier;
      }
    } else {
      return '';
    }
  }

  function validateScore() {
    const totalScore = charaAbilities.reduce(
      (totalScore, data) => totalScore + parseInt(data.score || 0, 10),
      0
    );
    if (totalScore !== 73) {
      return true;
    } else {
      return false;
    }
  }

  function processMoves() {
    // STARTING MOVES
    let startingMoves = class_details[charaClass].moves.filter(
      (x) => x.level === 'starting' && x.selected === true
    );
    if (charaMoveOption.length > 0) {
      const newMoves = class_details[charaClass].moves.filter(
        (x) => x.name === charaMoveOption
      );
      startingMoves = startingMoves.concat(newMoves);
    }
    return startingMoves;
  }

  function processSpells() {
    // STARTING SPELLS
    let startingSpells = [];
    if (charaClass === 'Cleric' || charaClass === 'Wizard') {
      // You start with all level 0 spells
      startingSpells = class_details[charaClass].spells.filter(
        (x) => x.level === 0
      );
      if (
        charaRaceMove ===
        'You are one with stone. When you commune you are also granted a special version of Words of the Unspeaking as a rote which only works on stone.'
      ) {
        const raceSpell = [
          {
            name: 'Words of the Unspeaking (Stone)',
            description:
              'With a touch you speak to the spirits within stone. The stone you touch answers three questions you pose, as best it can.',
            level: 0,
          },
        ];
        startingSpells = startingSpells.concat(raceSpell);
      }
      if (
        charaRaceMove ===
        'Magic is as natural as breath to you. Detect Magic is a cantrip for you.'
      ) {
        const raceSpell = [
          {
            name: 'Detect Magic',
            description:
              'One of your senses is briefly attuned to magic. The GM will tell you what here is magical.',
            level: 0,
            school: 'Divination',
            ongoing: true,
          },
        ];
        startingSpells = startingSpells.concat(raceSpell);
      }
      const chosenSpells = class_details[charaClass].spells.filter((x) =>
        charaSpellOptions.includes(x.name)
      );
      console.log('chosenSpells', chosenSpells);
      startingSpells = startingSpells.concat(chosenSpells);
    }

    if (charaClass === 'Cleric') {
      //Adding forgotten
      startingSpells = startingSpells.map((x) => {
        return Object.assign({}, x, { forgotten: false });
      });
    } else if (charaClass === 'Wizard') {
      //Adding prepared and forgotten
      startingSpells = startingSpells.map((x) => {
        if (x.level === 0) {
          return Object.assign({}, x, { prepared: true, forgotten: false });
        } else {
          return Object.assign({}, x, { prepared: false, forgotten: false });
        }
      });
    }
    return startingSpells;
  }

  function processGearFunds() {
    // STARTING FUNDS
    let startingFunds = String(class_details[charaClass].starting_funds);
    // STARTING GEAR
    let startingGear = class_details[charaClass].starting_gear;
    let gearChoices = charaGearOptions.map((choice, index) => {
      const choiceGroup = index;
      let item = '';
      // Lookup gear choices
      if (Array.isArray(choice)) {
        // For multi-choice options
        choice.map((option) => {
          return (item =
            class_details[charaClass].starting_gear_options[choiceGroup]
              .options[option]);
        });
      } else {
        //single item choice
        item =
          class_details[charaClass].starting_gear_options[choiceGroup].options[
            choice
          ];
      }
      return item;
    });
    // Flatten array of choices and add to starting Gear
    startingGear = startingGear.concat(gearChoices.flat());
    // Converting gear into actual items and adding checkboxes
    startingGear = startingGear
      .map((item) => {
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
      })
      .filter((x) => x !== null);
    return [startingGear, startingFunds];
  }

  function saveCharacter() {
    if (campaignURL && charaName) {
      const startingMoves = processMoves();
      const startingSpells = processSpells();
      const maxHP = maxHp();
      const gearFunds = processGearFunds();
      const startingGear = gearFunds[0];
      const startingFunds = gearFunds[1];

      // SAVE FUNCTION
      FirebaseService.saveCharacter(campaignURL, charaName, {
        abilities: charaAbilities,
        alignment: charaAlignment,
        armour: '0',
        backstory: '',
        bonds: charaBonds,
        dw_class: charaClass,
        full_name: charaFullName,
        funds: startingFunds,
        hp: maxHP,
        items: startingGear,
        level: '1',
        look: '',
        moves: startingMoves,
        owner: currentUser.email,
        race: charaRace,
        race_move: charaRaceMove,
        spells: startingSpells,
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
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        //BASIC DETAILS
        return (
          <>
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title='Class & Alignment'
              />
              <CardContent className={classes.cardContent}>
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
                  <ReactMarkdown source={classIntro()} />
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
                  <ReactMarkdown source={alignmentAttribute()} />
                </FormControl>
              </CardContent>
            </Card>
            {charaClass ? (
              <>
                <br />
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardHeader}
                    title='Race & Race Move'
                  />
                  <CardContent>
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
                    <br />
                    <FormControl
                      component='fieldset'
                      className={classes.formControl}>
                      <RadioGroup
                        aria-label='race move'
                        name='race move'
                        value={charaRaceMove}
                        onChange={(event) =>
                          setCharaRaceMove(event.target.value)
                        }>
                        {charaClass &&
                          class_details[charaClass].race_moves.map(
                            (data, index) => {
                              return (
                                <FormControlLabel
                                  key={index}
                                  value={data.move}
                                  control={<Radio color='primary' />}
                                  label={
                                    data.move +
                                    '\n(usually used with ' +
                                    data.race +
                                    ')'
                                  }
                                />
                              );
                            }
                          )}
                      </RadioGroup>
                    </FormControl>
                  </CardContent>
                </Card>
                <br />
                <Card className={classes.card}>
                  <CardHeader className={classes.cardHeader} title='Name' />
                  <CardContent>
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
                    <ReactMarkdown source={suggestedNames()} />
                  </CardContent>
                </Card>
              </>
            ) : null}
            <br />
            <Button
              onClick={handleCancel}
              className={classes.button}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant='contained'
              color='primary'>
              Reset
            </Button>
            <Button
              disabled
              onClick={handleBack}
              className={classes.button}
              variant='contained'
              color='primary'>
              Back
            </Button>
            <Button
              disabled={
                !charaRace ||
                !charaAlignment ||
                !charaRaceMove ||
                !charaName ||
                !charaFullName
              }
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={handleNext}>
              Next
            </Button>
          </>
        );
      case 1:
        // GEAR
        return (
          <>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} title='Gear' />
              <CardContent>
                <ReactMarkdown
                  source={class_details[charaClass].starting_gear_details}
                />
                {gearOptions()}
              </CardContent>
            </Card>
            <br />
            <Button
              onClick={handleCancel}
              className={classes.button}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant='contained'
              color='primary'>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              variant='contained'
              color='primary'>
              Back
            </Button>
            <Button
              disabled={
                charaGearOptions.includes(undefined) ||
                charaGearOptions.length !==
                  class_details[charaClass].starting_gear_options.length ||
                (charaClass === 'Fighter' && charaGearOptions[1].length !== 2)
              }
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={handleNext}>
              Next
            </Button>
          </>
        );
      case 2:
        //MOVES AND SPELLS
        return (
          <>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} title='Moves' />
              <CardContent>
                You start with the following moves:
                {class_details[charaClass].moves
                  .filter((x) => x.level === 'starting')
                  .map((move, index) => {
                    return (
                      <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          {move.name}
                        </AccordionSummary>
                        <AccordionDetails>
                          <div>
                            <ReactMarkdown source={move.description} />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                {moveOptions()}
              </CardContent>
            </Card>
            <br />
            {charaClass === 'Cleric' || charaClass === 'Wizard' ? (
              <>
                <Card className={classes.card}>
                  <CardHeader className={classes.cardHeader} title='Spells' />
                  <CardContent>
                    You start with the following spells:
                    {class_details[charaClass].spells
                      .filter((x) => x.level === 0)
                      .map((spell, index) => {
                        let spellOngoing = '';
                        if (spell.ongoing) {
                          spellOngoing = ' (Ongoing)';
                        }
                        let spellSchool = '';
                        if (spell.school) {
                          spellSchool = ' (' + spell.school + ')';
                        }
                        return (
                          <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMore />}>
                              {spell.name}
                              {spellOngoing}
                              {spellSchool}
                            </AccordionSummary>
                            <AccordionDetails>
                              <div>
                                <ReactMarkdown source={spell.description} />
                              </div>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                    {charaRaceMove ===
                    'You are one with stone. When you commune you are also granted a special version of Words of the Unspeaking as a rote which only works on stone.' ? (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          Words of the Unspeaking (Stone)
                        </AccordionSummary>
                        <AccordionDetails>
                          With a touch you speak to the spirits within stone.
                          The stone you touch answers three questions you pose,
                          as best it can.
                        </AccordionDetails>
                      </Accordion>
                    ) : null}
                    {charaRaceMove ===
                    'Magic is as natural as breath to you. Detect Magic is a cantrip for you.' ? (
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          Detect Magic (Ongoing) (Divination)
                        </AccordionSummary>
                        <AccordionDetails>
                          One of your senses is briefly attuned to magic. The GM
                          will tell you what here is magical.
                        </AccordionDetails>
                      </Accordion>
                    ) : null}
                    {spellOptions()}
                  </CardContent>
                </Card>
                <br />
              </>
            ) : null}
            <Button
              onClick={handleCancel}
              className={classes.button}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant='contained'
              color='primary'>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              variant='contained'
              color='primary'>
              Back
            </Button>
            <Button
              disabled={
                (charaClass === 'Barbarian' && charaMoveOption.length === 0) ||
                (charaClass === 'Wizard' && charaSpellOptions.length !== 3)
              }
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={handleNext}>
              Next
            </Button>
          </>
        );
      case 3:
        //ABILITIES
        return (
          <>
            <Card className={classes.abCard}>
              <CardHeader
                className={classes.cardHeader}
                title='Character Abilities'
              />
              <CardContent>
                <p>Assign the following ability scores: 16, 15, 13, 12, 9, 8</p>
                <Grid className={classes.root}>
                  <Grid item xs={12}>
                    <Grid container justify='center' spacing={1}>
                      {charaAbilities.map((ability, index) => {
                        return (
                          <Grid item key={index}>
                            <Card>
                              <CardContent className={classes.abCardContent}>
                                <p className={classes.abTitle}>
                                  {ability.category}
                                </p>
                                <TextField
                                  type='number'
                                  variant='outlined'
                                  error={validateScore()}
                                  size='small'
                                  margin='none'
                                  name={ability.category + 'Score'}
                                  value={ability.score}
                                  className={classes.abTextField}
                                  inputProps={{
                                    style: { textAlign: 'center' },
                                    min: 1,
                                    max: 18,
                                  }}
                                  onChange={(e) =>
                                    updateAbilityScore(index, e.target.value)
                                  }
                                />
                                <br />
                                <TextField
                                  variant='outlined'
                                  name={ability.category + 'Modifier'}
                                  value={abilityModifier(
                                    ability.score,
                                    ability.afflicted
                                  )}
                                  InputProps={{ readOnly: true }}
                                  inputProps={{
                                    style: {
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                      fontSize: 25,
                                    },
                                  }}
                                  className={classes.abTextField}
                                />
                                <br />
                                <Button
                                  onClick={() => {
                                    updateAbilityAfflicted(index);
                                  }}
                                  className={classes.abButton}>
                                  {afflictedValue(
                                    ability.category,
                                    ability.afflicted
                                  )}
                                </Button>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <br />
            <Button
              onClick={handleCancel}
              className={classes.button}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant='contained'
              color='primary'>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              variant='contained'
              color='primary'>
              Back
            </Button>
            <Button
              disabled={validateScore()}
              className={classes.button}
              variant='contained'
              onClick={handleNext}
              color='primary'>
              Next
            </Button>
          </>
        );
      case 4:
        //BONDS
        return (
          <>
            <Card className={classes.card}>
              <CardHeader className={classes.cardHeader} title='Bonds' />
              <CardContent>
                <FormControl
                  component='fieldset'
                  className={classes.formControl}>
                  <FormLabel component='legend'>
                    Choose some optionally suggested bonds or you can create
                    your own!
                  </FormLabel>
                  <br />
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
              </CardContent>
            </Card>
            <br />
            <Button
              onClick={handleCancel}
              className={classes.button}
              variant='contained'
              color='primary'>
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              className={classes.button}
              variant='contained'
              color='primary'>
              Reset
            </Button>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              variant='contained'
              color='primary'>
              Back
            </Button>
            {campaignURL ? (
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={handleSave}
                startIcon={<Save />}>
                Create Character
              </Button>
            ) : (
              <Button
                disabled
                variant='contained'
                color='primary'
                onClick={handleSave}
                startIcon={<Save />}>
                Create Character
              </Button>
            )}
          </>
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <div className={classes.root}>
      <div>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link to='/dw-react'>Home</Link>
          <Link to={'/dw-react/' + campaignURL}>{campaignURL}</Link>
          <p>Create Character</p>
        </Breadcrumbs>
      </div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justify='center'>
        <Grid item xs={12}>
          {getStepContent(activeStep)}
        </Grid>
      </Grid>
    </div>
  );
}
