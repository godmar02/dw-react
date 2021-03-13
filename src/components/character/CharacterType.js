import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { races } from 'data/raceList';
import { dw_classes } from 'data/classList';
import { class_details } from 'data/classDetails';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

export default function CharacterType() {
  const classes = useStyles();
  const { character } = useContext(CharacterState);
  const dwc = character.dw_class;
  const alig = character.alignment;

  const alignmentAttribute = () => {
    if (character.dw_class && character.alignment) {
      return class_details[dwc].alignments.find((x) => x.alignment === alig)
        .attribute;
    } else {
      return '';
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='simple table'>
        <TableBody>
          <TableRow>
            <TableCell>RACE ATTRIBUTE</TableCell>
            <TableCell>
              <TextField
                multiline
                fullWidth
                variant='outlined'
                aria-label='empty textarea'
                name='raceAttribute'
                InputProps={{
                  readOnly: true,
                }}
                value={character.race_attribute}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ALIGNMENT ATTRIBUTE</TableCell>
            <TableCell>
              {
                <TextField
                  multiline
                  fullWidth
                  variant='outlined'
                  aria-label='empty textarea'
                  name='alignmentAttribute'
                  InputProps={{
                    readOnly: true,
                  }}
                  value={alignmentAttribute()}
                />
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
