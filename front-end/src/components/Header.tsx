import { Box, Button } from '@material-ui/core';
import { apiSignOut } from '../services/apiServices';
import { makeStyles } from '@material-ui/core/styles';
import { userContext } from '../contexts/userContext';
import React, { useContext } from 'react';

const useStyles = makeStyles({
  button: {
    border: '1px solid rgb(224,224,224)',
    color: 'white',
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
    <Box
      width="100%"
      height="70px"
      marginBottom="16px"
      display="flex"
      alignItems="center"
      style={{ backgroundColor: '#EB786E' }}
    >
      <strong
        style={{
          color: 'white',
          fontSize: '1.5rem',
          flex: '1',
          marginLeft: '24px',
        }}
      >
        DESPESAS
      </strong>
      <Box component="span" marginRight="24px" color="white">
        <span style={{ marginRight: '8px' }}>Olá! {user}</span>
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
