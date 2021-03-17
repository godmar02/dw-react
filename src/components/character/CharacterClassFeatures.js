import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { Add, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function CharacterClassFeatures() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);

  // State manipulation
  const updateFeatureCheckbox = (index) => (e) => {
    let newFeatures = [...character.class_features]; // copying the old array
    newFeatures[index] = {
      ...character.class_features[index],
      checkbox: e.target.checked,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      class_features: newFeatures,
    })); // set array back
  };

  const updateFeature = (index) => (e) => {
    let newFeatures = [...character.class_features]; // copying the old array
    newFeatures[index] = {
      ...character.class_features[index],
      feature: e.target.value,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      class_features: newFeatures,
    })); // set array back
  };

  // Delete rows in the table
  const deleteFeatureRow = (index) => {
    const newFeatures = [...character.class_features]; // copying the old array
    newFeatures.splice(index, 1); // remove item from array
    setCharacter((character) => ({
      ...character,
      class_features: newFeatures,
    })); // set array back
  };

  // Add rows in the table
  const addFeatureRow = () => {
    const newFeatures = [
      ...character.class_features,
      { feature: '', checkbox: false },
    ]; // copying the old array and adding blank item
    setCharacter((character) => ({
      ...character,
      class_features: newFeatures,
    })); // set array back
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {character.class_features &&
            character.class_features.map((class_features, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      name={'class_feature_checkbox' + index}
                      checked={!!class_features.checkbox}
                      onChange={updateFeatureCheckbox(index)}
                      color='primary'
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      multiline
                      fullWidth
                      variant='outlined'
                      aria-label='empty textarea'
                      placeholder='Add any Class Features here (e.g. Spell Lists, Poison Recipes, Druid Balance, Paladin Quests or anything else!)'
                      value={class_features.feature}
                      name={'class_feature' + index}
                      onChange={updateFeature(index)}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label='delete'
                      onClick={() => deleteFeatureRow(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          <TableRow>
            <TableCell colSpan='3' align='center'>
              <IconButton aria-label='add' onClick={() => addFeatureRow()}>
                <Add />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
