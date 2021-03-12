import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export default function CharacterClassStartingMoves() {
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;

  return <></>;
}
