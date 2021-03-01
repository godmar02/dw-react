import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {makeStyles} from '@material-ui/core/styles';
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core';
import {ExpandMore} from '@material-ui/icons';
import {classMoves} from 'data/movesList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CharacterClassMoves() {
  const classes = useStyles();

  // State Variables
  const [character] = useContext(CharacterState);
  const dwc = character.dwClass;

  return (
  <>
        { dwc && classMoves.[dwc].startingMoves.map((data) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}>
                {data.name}
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

export default CharacterClassMoves;
