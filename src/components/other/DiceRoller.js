import React, {useState} from 'react';
import {
  Button,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';

function DiceRoller() {

  const [dice, setDice] = useState();
  const [diceNum, setDiceNum] = useState();
  const [rollResult, setRollResult] = useState(0);

  function singleRoll(sides) {
    const roll = Math.floor(Math.random() * sides) + 1;
    return roll;
  }

  function rollDice(sides, diceNum) {
    sides = parseInt(sides,10);
    diceNum = parseInt(diceNum,10);
    let total = 0;
    for (let i = 0; i < diceNum; i++) {
      total = total + singleRoll(sides);
    }
    return setRollResult(total);
  }

  return (
  <>
    <Select tabIndex={-1} defaultValue="null" onChange={event => {
        setDice(event.target.value)
      }}>
      <MenuItem disabled="disabled" value="null" hidden="hidden"/>
      <MenuItem value="6">d6</MenuItem>
      <MenuItem value="8">d8</MenuItem>
      <MenuItem value="10">d10</MenuItem>
    </Select>
    <br></br>
    <Select tabIndex={-1} defaultValue="null" onChange={event => {
        setDiceNum(event.target.value)
      }}>
      <MenuItem disabled="disabled" value="null" hidden="hidden"/>
      <MenuItem value="1">1</MenuItem>
      <MenuItem value="2">2</MenuItem>
      <MenuItem value="3">3</MenuItem>
    </Select>
    <Button onClick={()=>rollDice(dice,diceNum)}>Roll</Button>
    <TextField value={rollResult} />
  </>);
}

export default DiceRoller;
