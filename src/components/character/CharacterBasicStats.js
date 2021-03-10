import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import CharacterDamage from 'components/character/CharacterDamage';
import CharacterArmour from 'components/character/CharacterArmour';
import CharacterFunds from 'components/character/CharacterFunds';
import CharacterHP from 'components/character/CharacterHP';
import CharacterLevel from 'components/character/CharacterLevel';
import CharacterXP from 'components/character/CharacterXP';

export default function CharacterBasicStats() {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <CharacterLevel />
            </TableCell>
            <TableCell>
              <CharacterXP />
            </TableCell>
            <TableCell>
              <CharacterDamage />
            </TableCell>
            <TableCell>
              <CharacterArmour />
            </TableCell>
            <TableCell>
              <CharacterFunds />
            </TableCell>
            <TableCell>
              <CharacterHP />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
