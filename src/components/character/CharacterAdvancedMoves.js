import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { advanced_moves } from 'data/advancedMovesList';

export default function CharacterAdvancedMoves() {
  return (
    <>
      {advanced_moves.map((data, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              {data.name}
            </AccordionSummary>
            <AccordionDetails>
              <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
