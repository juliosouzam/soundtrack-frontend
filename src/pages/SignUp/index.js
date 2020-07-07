import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container, Form, FormTitle, Input, Button } from './styles';

function SingUp() {
  const history = useHistory();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      api.post('/register', { name, email, password }).then((response) => {
        history.push('/');
      });
    },
    [email, history, name, password],
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Cadastrar</FormTitle>
        <Input
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <Button>Cadastrar</Button>

        <div>
          <Link to="/">Voltar ao login</Link>
        </div>
      </Form>
    </Container>
  );
}

export default SingUp;
