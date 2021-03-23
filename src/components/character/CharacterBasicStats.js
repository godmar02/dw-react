import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CharacterDamage from 'components/character/CharacterDamage';
import CharacterArmour from 'components/character/CharacterArmour';
import CharacterFunds from 'components/character/CharacterFunds';
import CharacterHP from 'components/character/CharacterHP';
import CharacterLevel from 'components/character/CharacterLevel';
import CharacterXP from 'components/character/CharacterXP';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
}));

export default function CharacterBasicStats() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={1}>
          <Grid item>
            <CharacterLevel />
          </Grid>
          <Grid item>
            <CharacterHP />
          </Grid>
          <Grid item>
            <CharacterXP />
          </Grid>
          <Grid item>
            <CharacterDamage />
          </Grid>
          <Grid item>
            <CharacterArmour />
          </Grid>
          <Grid item>
            <CharacterFunds />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
