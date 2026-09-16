import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import advanced_moves from 'data/advancedMoves.json';
import ReactMarkdown from 'react-markdown';

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
              <div>
                <ReactMarkdown escapeHtml={false} source={data.description} />
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
}
