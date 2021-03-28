import React, { useContext, useState } from 'react';
import AddSpellState from 'components/contexts/AddSpellState';
import CharacterState from 'components/contexts/CharacterState';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import ReactMarkdown from 'react-markdown';
import { class_details } from 'data/classDetails';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 5,
    marginBottom: 5,
    minWidth: '100%',
  },
}));

export default function AddSpell() {
  const classes = useStyles();
  const { open, setOpen } = useContext(AddSpellState);
  const { character, setCharacter } = useContext(CharacterState);
  const [charaClass, setCharaClass] = useState(character.dw_class);
  const [levelOne, setLevelOne] = useState(false);
  const [levelThree, setLevelThree] = useState(false);
  const [levelFive, setLevelFive] = useState(false);
  const [levelSeven, setLevelSeven] = useState(false);
  const [levelNine, setLevelNine] = useState(false);

  function handleCancel() {
    setLevelOne(false);
    setLevelThree(false);
    setLevelFive(false);
    setLevelSeven(false);
    setLevelNine(false);
    setCharaClass('');
    setOpen(false);
  }

  function handleSave(spell) {
    addSpell(spell);
    handleCancel();
  }

  //TODO PREPARED = FALSE
  const addSpell = (spell) => {
    const newSpell = class_details[charaClass].spells.find(
      (x) => x.name === spell
    );
    if (newSpell) {
      const newSpells = [...character.spells, newSpell]; // copying the old array and adding new spell depending upon selection
      setCharacter((character) => ({ ...character, spells: newSpells })); // set array back
    }
  };

  function level(input) {
    if (input === 1 && levelOne) {
      return input;
    } else if (input === 3 && levelThree) {
      return input;
    } else if (input === 5 && levelFive) {
      return input;
    } else if (input === 7 && levelSeven) {
      return input;
    } else if (input === 9 && levelNine) {
      return input;
    } else {
      return null;
    }
  }

  function isChosen(spell) {
    if (character.spells.filter((x) => x.name === spell).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle id='form-dialog-title'>Add new spell</DialogTitle>{' '}
      <DialogContent>
        <div>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Class</InputLabel>
            <Select
              label='Class'
              value={charaClass}
              name='class'
              onChange={(event) => {
                setCharaClass(event.target.value);
              }}>
              <MenuItem value='Cleric'>Cleric</MenuItem>
              <MenuItem value='Wizard'>Wizard</MenuItem>
            </Select>
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Filter by level:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='One'
                    onChange={() => setLevelOne(!levelOne)}
                  />
                }
                label='1'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='Three'
                    onChange={() => setLevelThree(!levelThree)}
                  />
                }
                label='3'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='Five'
                    onChange={() => setLevelOne(!levelFive)}
                  />
                }
                label='5'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='Seven'
                    onChange={() => setLevelSeven(!levelSeven)}
                  />
                }
                label='7'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='Nine'
                    onChange={() => setLevelOne(!levelNine)}
                  />
                }
                label='9'
              />
            </FormGroup>
          </FormControl>
        </div>
        <br />
        <div>
          {charaClass &&
            class_details[charaClass].spells
              .filter(
                (x) =>
                  (x.level === level(1) ||
                    x.level === level(3) ||
                    x.level === level(5) ||
                    x.level === level(7) ||
                    x.level === level(9)) &&
                  isChosen(x.name) !== true
              )
              .map((data, index) => {
                return (
                  <Typography component={'span'} key={index}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {data.name + ' (level ' + data.level + ')'}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div>
                          <ReactMarkdown source={data.description} />
                        </div>
                        <br />
                        <div>
                          <Button
                            onClick={() => handleSave(data.name)}
                            color='primary'>
                            Add Spell
                          </Button>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Typography>
                );
              })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}