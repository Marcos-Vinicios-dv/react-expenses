import { Box, Button } from '@material-ui/core';
import { apiSignOut } from '../services/apiServices';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../contexts/userContext';
import React, { useContext } from 'react';

const useStyles = makeStyles({
  button: {
    paddingLeft: '15px',
    border: '1px solid rgb(224,224,224)',
    color: 'white',
  },
  headerContainer: {
    width: '100%',
    height: '70px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#EB786E',
    '& strong': {
      color: 'white',
      fontSize: '1.5rem',
      flex: '1',
      marginLeft: '24px',
    },
  },
  userArea: {
    marginRight: '24px',
    color: 'white',
    '& span': {
      marginRight: '8px',
    },
  },
});

const Header = React.memo(() => {
  const classes = useStyles();
  const { user, onSignOut } = useContext(userContext);
  function handleSignOut() {
    apiSignOut();
    onSignOut();
  }
  return (
    <Box className={classes.headerContainer}>
      <strong>DESPESAS</strong>
      <Box component="span" className={classes.userArea}>
        <span>Olá! {user}</span>
        <Button
          type="button"
          onClick={handleSignOut}
          className={classes.button}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
});

export default Header;
