import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import AddMoveState from 'components/contexts/AddMoveState';
import AddMove from 'components/character/AddMove';
import { class_details } from 'data/classDetails';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core';
import { Add, Delete, ExpandMore } from '@material-ui/icons';

export default function CharacterClassStartingMoves() {
  const { character, setCharacter } = useContext(CharacterState);
  const dwc = character.dw_class;
  function getMove(move, field) {
    return class_details[dwc].moves.find((x) => x.name === move)[field];
  }
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  const deleteMove = (index) => {
    const newMoves = [...character.moves]; // copying the old array
    if (character.moves.length !== 1) {
      //don't delete last row
      newMoves.splice(index, 1); // remove item from array
      setCharacter((character) => ({ ...character, moves: newMoves })); // set array back
    } else {
      alert('Cannot delete final row');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AddMoveState.Provider value={ctx}>
        <AddMove />
      </AddMoveState.Provider>
      {character.moves.map((data, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {data} ({getMove(data, 'level')})
            </AccordionSummary>
            <AccordionDetails>
              <p
                dangerouslySetInnerHTML={{
                  __html: getMove(data, 'description'),
                }}></p>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
