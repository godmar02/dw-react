import React, { useContext, useState } from 'react';
import AddMoveState from 'components/contexts/AddMoveState';
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
import { dw_classes } from 'data/dwClasses';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 5,
    marginBottom: 5,
    minWidth: '100%',
  },
}));

export default function AddMove() {
  const classes = useStyles();
  const { open, setOpen } = useContext(AddMoveState);
  const { character, setCharacter } = useContext(CharacterState);
  const [charaClass, setCharaClass] = useState(character.dw_class);
  const [twoToFive, setTwoToFive] = useState(false);
  const [sixToTen, setSixToTen] = useState(false);

  function handleCancel() {
    setTwoToFive(false);
    setSixToTen(false);
    setCharaClass('');
    setOpen(false);
  }

  function handleSave(move) {
    addMove(move);
    handleCancel();
  }

  const addMove = (move) => {
    const newMove = class_details[charaClass].moves.find(
      (x) => x.name === move
    );
    if (newMove) {
      const newMoves = [...character.moves, newMove]; // copying the old array and adding new move depending upon selection
      setCharacter((character) => ({ ...character, moves: newMoves })); // set array back
    }
  };

  function level(input) {
    if (input === '2to5' && twoToFive) {
      return input;
    } else if (input === '6to10' && sixToTen) {
      return input;
    } else {
      return null;
    }
  }

  function isChosen(move) {
    if (character.moves.filter((x) => x.name === move).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle id='form-dialog-title'>Add new move</DialogTitle>{' '}
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
              {dw_classes.map((data, index) => {
                return (
                  <MenuItem value={data} key={index}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Filter Moves:</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='2to5'
                    onChange={() => setTwoToFive(!twoToFive)}
                  />
                }
                label='Level 2-5'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    name='6to10'
                    onChange={() => setSixToTen(!sixToTen)}
                  />
                }
                label='Level 6-10'
              />
            </FormGroup>
          </FormControl>
        </div>
        <br />
        <div>
          {charaClass &&
            class_details[charaClass].moves
              .filter(
                (x) =>
                  (x.level === level('2to5') || x.level === level('6to10')) &&
                  isChosen(x.name) !== true
              )
              .map((data, index) => {
                return (
                  <Typography component={'span'} key={index}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        {data.name}
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
                            Add Move
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
