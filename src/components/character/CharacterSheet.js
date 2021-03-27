import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { useParams } from 'react-router';
import * as FirebaseService from 'services/firebase';
import PropTypes from 'prop-types';
import CharacterState from 'components/contexts/CharacterState';
import AuthState from 'components/contexts/AuthState';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import CharacterSheetHeader from 'components/character/CharacterSheetHeader';
import CharacterBasicDetails from 'components/character/CharacterBasicDetails';
import CharacterBasicStats from 'components/character/CharacterBasicStats';
import CharacterAbilities from 'components/character/CharacterAbilities';
import CharacterBonds from 'components/character/CharacterBonds';
import CharacterGear from 'components/character/CharacterGear';
import CharacterClassFeatures from 'components/character/CharacterClassFeatures';
import CharacterMoves from 'components/character/CharacterMoves';
import DiceRoller from 'components/other/DiceRoller';

// Tab functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

// Debounce function
const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export default function CharacterSheet() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [character, setCharacter] = useState({});
  const { campaignURL, characterURL } = useParams();
  const { currentUser } = useContext(AuthState);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Subscribe to Character Data
  useEffect(() => {
    if (campaignURL && characterURL) {
      const unsubscribe = FirebaseService.streamCharacter(
        campaignURL,
        characterURL,
        {
          next: (documentSnapshot) => {
            setCharacter(documentSnapshot.data());
          },
          error: (error) => {
            alert('Failed to load character data correctly, see console error');
            console.error('Error loading document:', error);
          },
        }
      );
      return unsubscribe;
    }
  }, [campaignURL, characterURL, setCharacter]);

  // Debounced Save
  const debouncedSave = useCallback(
    debounce(
      (character) =>
        FirebaseService.saveCharacter(campaignURL, characterURL, character)
          .then(() => {
            console.info('Saved Character:', character);
          })
          .catch((error) => {
            alert('Failed to save character data correctly, see console error');
            console.error('Error saving document:', error);
          }),
      5000
    ),
    []
  );

  // Save changes to character
  useEffect(() => {
    if (
      character &&
      Object.keys(character).length >= 1 &&
      currentUser.email === character.owner
    ) {
      console.info('CharacterState:', character);
      debouncedSave(character);
    }
  }, [character]); //Only trigger effect on change of character

  const ctx = useMemo(() => ({ character, setCharacter }), [character]); //Memo-ised state for performance

  return (
    <CharacterState.Provider value={ctx}>
      <CharacterSheetHeader />
      <br />
      <div className={classes.root}>
        <CharacterBasicStats />
        <br />
        <CharacterAbilities />
        <br />
        <AppBar position='static'>
          <Tabs
            value={value}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'>
            <Tab label='About' {...a11yProps(0)} />
            <Tab label='Bonds' {...a11yProps(1)} />
            <Tab label='Features' {...a11yProps(2)} />
            <Tab label='Gear' {...a11yProps(3)} />
            <Tab label='Moves' {...a11yProps(4)} />
            <Tab label='Dice Roller' {...a11yProps(5)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CharacterBasicDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CharacterBonds />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CharacterClassFeatures />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <CharacterGear />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <CharacterMoves />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <DiceRoller />
        </TabPanel>
      </div>
    </CharacterState.Provider>
  );
}
