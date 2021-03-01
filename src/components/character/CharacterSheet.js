import React, {useState, useEffect, useCallback} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {useParams} from "react-router";
import * as FirebaseService from 'services/firebase';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar,Box,Tab,Tabs} from '@material-ui/core';
import CharacterSheetHeader from 'components/character/CharacterSheetHeader'
import CharacterBasicDetails from 'components/character/CharacterBasicDetails'
import CharacterType from 'components/character/CharacterType'
import CharacterBasicAttributes from 'components/character/CharacterBasicAttributes'
import CharacterAbilities from 'components/character/CharacterAbilities'
import CharacterBonds from 'components/character/CharacterBonds'
import CharacterGear from 'components/character/CharacterGear'
import CharacterClassFeatures from 'components/character/CharacterClassFeatures'
import CharacterMoves from 'components/character/CharacterMoves'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
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
const debounce = (callback,delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args),delay);
  }
}

function CharacterSheet() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // Definitions for state
  const [character, setCharacter] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // retrieve URL parameters for usage
  const { campaignURL, characterURL } = useParams();

  // Use an effect hook to subscribe to the character stream and
  // automatically unsubscribe when the component unmounts.
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

  // Saving character
  const debouncedSave = useCallback(
    debounce(character =>
      FirebaseService.saveCharacter(campaignURL, characterURL, character)
        .then(() => {
          setIsSaving(false);
          console.info('Saved Character:', character );
        })
        .catch((error) => {
          alert("Failed to save character data correctly, see console error");
          console.error("Error saving document:", error);
          //If saving fails then it will not retry until the error is rectified
        })
    , process.env.DEBOUNCE_SAVE_DELAY_MS),[]);

  useEffect(
    () => {
      if (character && Object.keys(character).length >= 1) {
        setIsSaving(true);
        debouncedSave(character);
      }
    }, [character] //Only trigger effect on change of character
  );

  console.info("CharacterState:",character);
  console.info("isSaving",isSaving);

  return (
  <CharacterState.Provider value={[character, setCharacter]}>
    <CharacterSheetHeader/>
    <br/>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Character" {...a11yProps(0)} />
        <Tab label="Gear" {...a11yProps(1)} />
        <Tab label="Moves" {...a11yProps(2)} />
        <Tab label="Dice Roller" {...a11yProps(3)} />
      </Tabs>
      </AppBar>
    <TabPanel value={value} index={0}>
      <CharacterBasicDetails/>
      <br/>
      <CharacterType/>
      <br/>
      <CharacterBasicAttributes/>
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
    </TabPanel>
  </div>
  </CharacterState.Provider>);
}

export default CharacterSheet;
