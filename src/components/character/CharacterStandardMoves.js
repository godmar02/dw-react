import React from 'react';
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {standardMoves} from 'data/movesList';

function CharacterStandardMoves() {

  return (
  <>
        {
          standardMoves.map((data) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}>{data.name}
                </AccordionSummary>
                <AccordionDetails>
                      <p dangerouslySetInnerHTML={{__html: data.description }}></p>
                </AccordionDetails>
              </Accordion>
              );
          })
        }
    </>);
}

export default CharacterStandardMoves;
