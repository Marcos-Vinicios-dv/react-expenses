import { Container, Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { apiSignIn } from '../services/apiServices';

interface ILoginProps {
  onSignIn: (user: string) => void;
}

const Login = (props: ILoginProps) => {
  const [email, setEmail] = useState<string>('usuario@email.com');
  const [password, setPassword] = useState<string>('1234');
  const [error, setError] = useState('');

  async function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    await apiSignIn(email, password).then(
      res => props.onSignIn(res.nome),
      e => {
        setError('Email não encontrado ou senha incorreta!');
      }
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>React Expenses</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail
        <kbd>usuario@email.com</kbd> e a senha <kbd>1234</kbd>.
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={evt => setEmail(evt.target.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          variant="outlined"
          value={password}
          onChange={evt => setPassword(evt.target.value)}
        />
        {error && <div>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
