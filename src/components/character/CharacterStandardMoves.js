import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {standardMoves} from 'data/movesList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CharacterStandardMoves() {
  const classes = useStyles();
  return (
  <>
        {
          standardMoves.map((data) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}>{data.name}
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
