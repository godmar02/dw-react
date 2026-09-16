import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import standard_moves from 'data/standardMoves.json';
import ReactMarkdown from 'react-markdown';

export default function CharacterStandardMoves() {
  return (
    <>
      {standard_moves.map((data, index) => {
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
