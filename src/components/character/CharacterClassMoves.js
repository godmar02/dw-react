import React, { useContext, useMemo, useState } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import AddMoveState from 'components/contexts/AddMoveState';
import AddMove from 'components/character/AddMove';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@material-ui/core';
import { Add, Delete, ExpandMore } from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';

export default function CharacterClassMoves() {
  const { character, setCharacter } = useContext(CharacterState);
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);

  const deleteMove = (index) => {
    const newMoves = [...character.moves]; // copying the old array
    if (character.moves[index].level !== 'starting') {
      newMoves.splice(index, 1); // remove item from array
      setCharacter((character) => ({ ...character, moves: newMoves })); // set array back
    } else {
      alert('Cannot delete starting move');
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
              {data.name} ({data.level})
              {data.level === 'starting' ? null : (
                <IconButton
                  aria-label='delete'
                  onClick={() => deleteMove(index)}>
                  <Delete />
                </IconButton>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <ReactMarkdown escapeHtml={false} source={data.description} />
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Accordion>
        <AccordionSummary>
          <IconButton aria-label='add' onClick={handleClickOpen}>
            <Add />
          </IconButton>
        </AccordionSummary>
      </Accordion>
    </>
  );
}
