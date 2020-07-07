import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, FormTitle, Input, Button } from './styles';

function SingIn() {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      api.post('/login', { email, password }).then((response) => {
        localStorage.setItem(
          '@soundtrack/token',
          JSON.stringify(response.data),
        );
        history.push('/home');
      });
    },
    [email, history, password],
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Entrar</FormTitle>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <div>
          <Link to="/register">Cadastrar-se</Link>
        </div>
        <Button>Entrar</Button>
      </Form>
    </Container>
  );
}

export default SingIn;
