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
  FormGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import { class_details } from 'data/classDetails';

export default function AddMove() {
  const { open, setOpen } = useContext(AddMoveState);
  const { character, setCharacter } = useContext(CharacterState);
  const [twoToFive, setTwoToFive] = useState(false);
  const [sixToTen, setSixToTen] = useState(false);
  const dwc = character.dw_class;

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = (move) => {
    addMove(move);
    setTwoToFive(false);
    setSixToTen(false);
    setOpen(false);
  };

  const addMove = (move) => {
    const newMove = class_details[dwc].moves.find((x) => x.name === move);
    if (newMove) {
      const newMoves = [...character.moves, newMove]; // copying the old array and adding new move depending upon selection
      console.log('newMoves', newMoves);
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
        {class_details[dwc].moves
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
                    <ReactMarkdown source={data.description} />
                    <br />
                    <Button
                      onClick={() => handleSave(data.name)}
                      color='primary'>
                      Add Move
                    </Button>
                  </AccordionDetails>
                </Accordion>
              </Typography>
            );
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
