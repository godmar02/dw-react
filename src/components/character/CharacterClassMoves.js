import React, { useContext, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  TextField,
  Tooltip,
} from '@material-ui/core';
import {
  Add,
  Delete,
  Edit,
  ExpandMore,
  Save,
  Refresh,
} from '@material-ui/icons';
import ReactMarkdown from 'react-markdown';
import CharacterState from 'components/contexts/CharacterState';
import AddMoveState from 'components/contexts/AddMoveState';
import AddMove from 'components/character/AddMove';
import { class_details } from 'data/classDetails';

export default function CharacterClassMoves() {
  const { character, setCharacter } = useContext(CharacterState);
  const [open, setOpen] = useState(false);
  const ctx = useMemo(() => ({ open, setOpen }), [open]);
  const [editing, setEditing] = useState([]);
  const [moves, setMoves] = useState(character.moves);
  const dwc = character.dw_class;

  function deleteMove(index) {
    const newMoves = [...character.moves]; // copying the old array
    if (character.moves[index].level !== 'starting') {
      newMoves.splice(index, 1); // remove item from array
      setCharacter((character) => ({ ...character, moves: newMoves })); // set array back
    } else {
      alert('Cannot delete starting move');
    }
  }

  function editMove(index) {
    const newEdit = [...editing];
    newEdit[index] = !editing[index];
    setEditing(newEdit);
  }

  function refreshMove(index) {
    const newMoves = [...moves];
    newMoves[index].description = class_details[dwc].moves.find(
      (move) => move.name === character.moves[index].name
    ).description;
    setMoves(newMoves, saveMove(index));
    editMove(index);
  }

  function handleDescChange(event, index) {
    const newMoves = [...moves];
    newMoves[index].description = event.target.value;
    setMoves(newMoves);
  }

  function saveMove(index) {
    const newMoves = [...moves];
    newMoves[index].description = moves[index].description;
    setCharacter((character) => ({ ...character, moves: newMoves }));
    editMove(index);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <>
      <AddMoveState.Provider value={ctx}>
        <AddMove />
      </AddMoveState.Provider>
      {moves.map((data, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {data.name} ({data.level})
              {data.level === 'starting' ? null : (
                <Tooltip title='Delete'>
                  <IconButton
                    aria-label='delete'
                    onClick={() => deleteMove(index)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {editing[index] ? (
                <>
                  <TextField
                    multiline
                    fullWidth
                    variant='outlined'
                    defaultValue={data.description}
                    onChange={(event) => handleDescChange(event, index)}
                  />
                  <div>
                    <Tooltip title='Refresh Description'>
                      <IconButton onClick={() => refreshMove(index)}>
                        <Refresh />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Save Description'>
                      <IconButton onClick={() => saveMove(index)}>
                        <Save />
                      </IconButton>
                    </Tooltip>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <ReactMarkdown
                      escapeHtml={false}
                      source={data.description}
                    />
                  </div>
                  <br />
                  <div>
                    <Tooltip title='Edit Description'>
                      <IconButton onClick={() => editMove(index)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </div>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Tooltip title='Add Move'>
        <IconButton onClick={handleClickOpen}>
          <Add />
        </IconButton>
      </Tooltip>
    </>
  );
}
