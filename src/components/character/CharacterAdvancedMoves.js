import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {advancedMoves} from 'data/movesList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CharacterAdvancedMoves() {
  const classes = useStyles();
  return (
  <>
        {
          advancedMoves.map((data) => {
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

export default CharacterAdvancedMoves;
