import React, {useContext} from 'react';
import CharacterState from 'components/contexts/CharacterState';
import {Add,Delete} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';
import {ExpandMore} from '@material-ui/icons';
import {Accordion,AccordionSummary,AccordionDetails,Checkbox,IconButton,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: 650,
  },
}));

function CharacterClassFeatures() {

  const classes = useStyles();

  // State Variables
  const {character, setCharacter}= useContext(CharacterState);

  // State manipulation
  const updateFeatureCheckbox = index => e => {
    let newFeatures = [...character.classFeatures]; // copying the old array
    newFeatures[index] = {...character.classFeatures[index], checkbox: e.target.checked}; // replace value
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  const updateFeature = index => e => {
    let newFeatures = [...character.classFeatures]; // copying the old array
    newFeatures[index] = {...character.classFeatures[index], feature: e.target.value}; // replace value
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  // Delete rows in the table
  const deleteFeatureRow = index => {
    const newFeatures = [...character.classFeatures]; // copying the old array
    if (character.classFeatures.length !== 1) { //don't delete last row
      newFeatures.splice(index, 1); // remove item from array
      setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
    } else {
      alert('Cannot delete final row');
    }
  }

  // Add rows in the table
  const addFeatureRow = () => {
    const newFeatures = [...character.classFeatures, {feature: "", checkbox: false}]; // copying the old array and adding blank item
    setCharacter(character => ({...character, classFeatures: newFeatures})); // set array back
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}>Class Features
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell colSpan="2" align="center">Feature</TableCell>
          <TableCell>
            <IconButton aria-label="add" onClick={() => addFeatureRow()}>
              <Add/>
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {
           character.classFeatures && character.classFeatures.map((classFeatures,index) => {
           return (
             <TableRow key={index}>
               <TableCell>
                 <Checkbox
                   name={"classFeatureCheckbox" + index}
                   checked={!!classFeatures.checkbox}
                   onChange={updateFeatureCheckbox(index)}
                   color="primary"
                   />
               </TableCell>
                 <TableCell>
                   <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                     aria-label="empty textarea"
                     placeholder="Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)"
                     value={classFeatures.feature}
                     name={"classFeature" + index}
                     onChange={updateFeature(index)}/>
                 </TableCell>
                 <TableCell>
                   <IconButton aria-label="delete" onClick={() => deleteFeatureRow(index)}>
                     <Delete/>
                   </IconButton>
                 </TableCell>
             </TableRow>)
          })
        }
      </TableBody>
      <tfoot/>
    </Table>
    </TableContainer>
  </AccordionDetails>
  </Accordion>
    );
}

export default CharacterClassFeatures;
