import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Box, Tab, Tabs} from '@material-ui/core';
import PropTypes from 'prop-types';
import CharacterClassStartingMoves from 'components/character/CharacterClassStartingMoves'
import CharacterClassAdvancedMoves2to5 from 'components/character/CharacterClassAdvancedMoves2to5'
import CharacterClassAdvancedMoves6to10 from 'components/character/CharacterClassAdvancedMoves6to10'

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
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

function CharacterClassMoves() {

  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (<div className={classes.root}>
    <AppBar position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Starting" {...a11yProps(0)}/>
        <Tab label="Levels 2-5" {...a11yProps(1)}/>
        <Tab label="Levels 6-10" {...a11yProps(2)}/>
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <CharacterClassStartingMoves/>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <CharacterClassAdvancedMoves2to5/>
    </TabPanel>
    <TabPanel value={value} index={2}>
      <CharacterClassAdvancedMoves6to10/>
    </TabPanel>
  </div>);
}

export default CharacterClassMoves;
