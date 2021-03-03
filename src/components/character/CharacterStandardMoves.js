import React from 'react';
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {standardMoves} from 'data/movesList';

export default function CharacterStandardMoves() {

  return (<> {
    standardMoves.map((data, index) => {
      return (<Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMore />}>{data.name}
        </AccordionSummary>
        <AccordionDetails>
          <p dangerouslySetInnerHTML={{__html: data.description}}></p>
        </AccordionDetails>
      </Accordion>);
    })
  } </>);
}
