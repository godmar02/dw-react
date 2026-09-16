import React, { useContext } from 'react';
import DarkState from 'components/contexts/DarkState';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Switch,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Brightness4, Menu } from '@mui/icons-material';
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
  const { darkState, setDarkState } = useContext(DarkState);
  function handleThemeChange() {
    setDarkState(!darkState);
  }
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
            Dungeon World Character Sheet (by Godmar02)
          </Typography>
          <Brightness4 />
          <Switch checked={darkState} onChange={handleThemeChange} />
          <UserProfile />
        </Toolbar>
      </AppBar>
    </div>
  );
}
