import { Container, Input, Button, Text, Link, Spacer } from '@nextui-org/react';
import { useState } from 'react';

const LoginScreen = () => {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setLoginForm({ ...loginForm, ...updatedValue });
  };

  const onFormSubmit = () => {
    if (loginForm.email && loginForm.password) {
      console.log(loginForm);
    }
  };

  return (
    <Container
      display="flex"
      direction="column"
      justify="center"
      css={{ maxWidth: '350px', height: '100vh' }}
    >
      <Text
        h1
        css={{
          textGradient: '45deg, $blue500 -20%, $pink500 50%',
        }}
      >
        Desma
      </Text>
      <Spacer y={2} />
      <Input
        labelPlaceholder="Email"
        name="email"
        value={loginForm.email}
        onChange={onInputChange}
        required
      />
      <Spacer y={2} />
      <Input.Password
        labelPlaceholder="Password"
        name="password"
        value={loginForm.password}
        onChange={onInputChange}
        required
      />
      <Spacer y={2} />
      <Button css={{ width: '100%', marginBottom: '.5rem' }} onClick={onFormSubmit}>
        Login
      </Button>
      <Text small>
        Need an account? <Link href="/auth/register">Register</Link>
      </Text>
    </Container>
  );
};

export default LoginScreen;
