import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
import CharacterStandardMoves from 'components/character/CharacterStandardMoves';
import CharacterAdvancedMoves from 'components/character/CharacterAdvancedMoves';
import CharacterClassMoves from 'components/character/CharacterClassMoves';

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

export default function CharacterMoves() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label='Standard' {...a11yProps(0)} />
          <Tab label='Advanced' {...a11yProps(1)} />
          <Tab label='Class' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CharacterStandardMoves />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CharacterAdvancedMoves />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CharacterClassMoves />
      </TabPanel>
    </div>
  );
}
