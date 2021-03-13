import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { class_details } from 'data/classDetails';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export default function CharacterClassStartingMoves() {
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;
  function getMove(move, field) {
    return class_details[dwc].moves.find((x) => x.name === move)[field];
  }

  return (
    <>
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
