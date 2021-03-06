import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/icons';
import UserProfile from 'components/profile/UserProfile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography component={'span'} variant='h6' className={classes.title}>
            Dungeon World Character Sheet (v0.10.0 by Godmar02)
          </Typography>
          <UserProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}
