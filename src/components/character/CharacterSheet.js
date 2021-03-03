import React, {useState, useEffect, useCallback, useContext, useMemo} from 'react';
import {useParams} from 'react-router';
import * as FirebaseService from 'services/firebase';
import PropTypes from 'prop-types';
import CharacterState from 'components/contexts/CharacterState';
import AuthState from 'components/contexts/AuthState';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Box, Tab, Tabs} from '@material-ui/core';
import CharacterSheetHeader from 'components/character/CharacterSheetHeader'
import CharacterBasicDetails from 'components/character/CharacterBasicDetails'
import CharacterType from 'components/character/CharacterType'
import CharacterBasicStats from 'components/character/CharacterBasicStats'
import CharacterAbilities from 'components/character/CharacterAbilities'
import CharacterBonds from 'components/character/CharacterBonds'
import CharacterGear from 'components/character/CharacterGear'
import CharacterClassFeatures from 'components/character/CharacterClassFeatures'
import CharacterMoves from 'components/character/CharacterMoves'
import DiceRoller from 'components/other/DiceRoller'

// Tab functions
function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
    {
      value === index && (<Box p={3}>
        {children}
      </Box>)
    }
  </div>);
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`};
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

// Debounce function
const debounce = (callback, delay) => {
  let timer;
  return(...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  }
}

function CharacterSheet() {

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [character, setCharacter] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const {campaignURL, characterURL} = useParams();
  const [currentUser] = useContext(AuthState);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Subscribe to Character Data
  useEffect(() => {
    if (campaignURL && characterURL) {
      const unsubscribe = FirebaseService.streamCharacter(campaignURL, characterURL, {
        next: documentSnapshot => {
          setCharacter(documentSnapshot.data());
        },
        error: (error) => {
          alert("Failed to load character data correctly, see console error");
          console.error("Error loading document:", error);
        }
      });
      return unsubscribe;
    }
  }, [campaignURL, characterURL, setCharacter]);

  // Debounced Save
  const debouncedSave = useCallback(debounce(character => FirebaseService.saveCharacter(campaignURL, characterURL, character).then(() => {
    setIsSaving(false);
    console.info('Saved Character:', character);
  }).catch((error) => {
    alert("Failed to save character data correctly, see console error");
    console.error("Error saving document:", error);
    //If saving fails then it will not retry until the error is rectified
  }), process.env.DEBOUNCE_SAVE_DELAY_MS), []);

  // Save changes to character
  useEffect(() => {
    if (character && Object.keys(character).length >= 1 && currentUser.email === character.owner) {
      setIsSaving(true);
      console.info("CharacterState:", character);
      debouncedSave(character);
    }
  }, [character]); //Only trigger effect on change of character

  useEffect(() => {
    console.info("isSaving:", isSaving)
  }, [isSaving]); //Only trigger effect on change of saving state

  const ctx = useMemo(() => ({character, setCharacter}), [character]); //Memo-ised state for performance

  return (<CharacterState.Provider value={ctx}>
    <CharacterSheetHeader/>
    <br/>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Character" {...a11yProps(0)}/>
          <Tab label="Gear" {...a11yProps(1)}/>
          <Tab label="Moves" {...a11yProps(2)}/>
          <Tab label="Dice Roller" {...a11yProps(3)}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CharacterBasicDetails/>
        <br/>
        <CharacterType/>
        <br/>
        <CharacterBasicStats/>
        <br/>
        <CharacterAbilities/>
        <br/>
        <CharacterBonds/>
        <br/>
        <CharacterClassFeatures/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CharacterGear/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CharacterMoves/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DiceRoller/>
      </TabPanel>
    </div>
  </CharacterState.Provider>);
}

export default CharacterSheet;
