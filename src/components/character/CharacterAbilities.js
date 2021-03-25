import React, { useContext } from 'react';
import CharacterState from 'components/contexts/CharacterState';
import { ability_afflictions } from 'data/abilityAfflictions';
import { Button, Card, CardContent, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    paddingTop: 5,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textField: {
    width: 85,
  },
  button: {
    width: 85,
    fontSize: 11,
    fontWeight: 'bold',
  },
}));

export default function CharacterAbilities() {
  const classes = useStyles();
  const { character, setCharacter } = useContext(CharacterState);

  const updateAbilityScore = (index) => (e) => {
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {
      ...character.abilities[index],
      score: e.target.value,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      abilities: newAbilities,
    })); // set array back
  };

  const updateAbilityAfflicted = (index) => {
    const newAffliction = !character.abilities[index].afflicted; //switching boolean
    let newAbilities = [...character.abilities]; // copying the old array
    newAbilities[index] = {
      ...character.abilities[index],
      afflicted: newAffliction,
    }; // replace value
    setCharacter((character) => ({
      ...character,
      abilities: newAbilities,
    })); // set array back
  };

  const afflictedValue = (ability, afflicted) => {
    if (afflicted) {
      return ability_afflictions[ability];
    } else {
      return 'Unafflicted';
    }
  };

  const abilityModifier = (abilityScore, abilityAffliction) => {
    if (abilityScore) {
      let baseModifier;
      let afflicted;

      abilityScore = parseInt(abilityScore, 10);

      if ([1, 2, 3].indexOf(abilityScore) > -1) {
        baseModifier = -3;
      } else if ([4, 5].indexOf(abilityScore) > -1) {
        baseModifier = -2;
      } else if ([6, 7, 8].indexOf(abilityScore) > -1) {
        baseModifier = -1;
      } else if ([9, 10, 11, 12].indexOf(abilityScore) > -1) {
        baseModifier = 0;
      } else if ([13, 14, 15].indexOf(abilityScore) > -1) {
        baseModifier = 1;
      } else if ([16, 17].indexOf(abilityScore) > -1) {
        baseModifier = 2;
      } else if (abilityScore === 18) {
        baseModifier = 3;
      }

      /* -1 if afflicted */
      if (abilityAffliction) {
        afflicted = 1;
      } else {
        afflicted = 0;
      }

      let modifier = baseModifier - afflicted;

      if (modifier > 0) {
        return '+' + modifier;
      } else {
        return modifier;
      }
    } else {
      return '';
    }
  };

  const validateScore = () => {
    const totalScore = character.abilities.reduce(
      (totalScore, data) => totalScore + parseInt(data.score || 0, 10),
      0
    );
    if (totalScore !== 73) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify='center' spacing={1}>
          {character.abilities &&
            character.abilities.map((abilities, index) => {
              return (
                <Grid item key={index}>
                  <Card>
                    <CardContent className={classes.cardContent}>
                      <p className={classes.title}>{abilities.category}</p>
                      <TextField
                        type='number'
                        variant='outlined'
                        error={validateScore()}
                        size='small'
                        margin='none'
                        name={abilities.category + 'Score'}
                        value={abilities.score}
                        className={classes.textField}
                        inputProps={{
                          style: { textAlign: 'center' },
                          min: 1,
                          max: 18,
                        }}
                        onChange={updateAbilityScore(index)}
                      />
                      <br />
                      <TextField
                        variant='outlined'
                        name={abilities.category + 'Modifier'}
                        value={abilityModifier(
                          abilities.score,
                          abilities.afflicted
                        )}
                        InputProps={{ readOnly: true }}
                        inputProps={{
                          style: {
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 25,
                          },
                        }}
                        className={classes.textField}
                      />
                      <br />
                      <Button
                        onClick={() => updateAbilityAfflicted(index)}
                        className={classes.button}>
                        {afflictedValue(
                          abilities.category,
                          abilities.afflicted
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}
