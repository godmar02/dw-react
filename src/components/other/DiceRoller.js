import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 126,
    textAlign: 'center',
  },
  textField: {
    width: 126,
    '& input': {
      textAlign: 'center',
    },
  },
}));

export default function DiceRoller() {
  const [dice, setDice] = useState();
  const [diceNum, setDiceNum] = useState();
  const [rollResult, setRollResult] = useState(0);
  const classes = useStyles();

  function singleRoll(sides) {
    const roll = Math.floor(Math.random() * sides) + 1;
    return roll;
  }

  function rollDice(sides, diceNum) {
    sides = parseInt(sides, 10);
    diceNum = parseInt(diceNum, 10);
    let total = 0;
    for (let i = 0; i < diceNum; i++) {
      total = total + singleRoll(sides);
    }
    return setRollResult(total);
  }

  return (
    <>
      <FormControl
        variant='outlined'
        size='small'
        className={classes.formControl}>
        <InputLabel>Dice</InputLabel>
        <Select
          tabIndex={-1}
          defaultValue='null'
          label='dice'
          onChange={(event) => {
            setDice(event.target.value);
          }}>
          <MenuItem disabled='disabled' value='null' hidden='hidden' />
          <MenuItem value='6'>d6</MenuItem>
          <MenuItem value='8'>d8</MenuItem>
          <MenuItem value='10'>d10</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl
        variant='outlined'
        size='small'
        className={classes.formControl}>
        <InputLabel>Number</InputLabel>
        <Select
          tabIndex={-1}
          defaultValue='null'
          label='Number'
          onChange={(event) => {
            setDiceNum(event.target.value);
          }}>
          <MenuItem disabled='disabled' value='null' hidden='hidden' />
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
        </Select>
      </FormControl>
      <Button onClick={() => rollDice(dice, diceNum)}>Roll</Button>
      <TextField
        variant='outlined'
        size='small'
        label='Result'
        className={classes.textField}
        value={rollResult}
      />
    </>
  );
}
