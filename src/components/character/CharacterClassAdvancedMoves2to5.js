import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { classMoves } from 'data/movesList';

export default function CharacterClassAdvancedMoves2to5() {
  const { character } = useContext(CharacterState);
  const dwc = character.dwClass;

  return (
    <>
      {' '}
      {dwc &&
        classMoves[dwc].advancedMoves2_5.map((data, index) => {
          return (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {data.name}
              </AccordionSummary>
              <AccordionDetails>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.description,
                  }}></p>
              </AccordionDetails>
            </Accordion>
          );
        })}{' '}
    </>
  );
}
