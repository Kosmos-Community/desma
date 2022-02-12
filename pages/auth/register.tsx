import { Container, Input, Button, Text, Link, Spacer } from '@nextui-org/react';
import { useState } from 'react';

const RegisterScreen = () => {
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setRegisterForm({ ...registerForm, ...updatedValue });
  };

  const onRegister = () => {
    if (registerForm.email && registerForm.password && registerForm.confirmPassword) {
      if (registerForm.password == registerForm.confirmPassword) {
        console.log(registerForm);
      }
    }
  };

  return (
    <Container
      display="flex"
      direction="column"
      justify="center"
      css={{ maxWidth: '350px', height: '100vh' }}
    >
      <Link href="/">
        <Text
          h1
          css={{
            textGradient: '45deg, $blue500 -20%, $pink500 50%',
          }}
        >
          <Link href="/">Desma</Link>
        </Text>
      </Link>
      <Spacer y={2} />
      <Input
        labelPlaceholder="Email"
        name="email"
        value={registerForm.email}
        onChange={onInputChange}
      />
      <Spacer y={2} />
      <Input.Password
        labelPlaceholder="Password"
        name="password"
        value={registerForm.password}
        onChange={onInputChange}
      />
      <Spacer y={2} />
      <Input.Password
        labelPlaceholder="Confirm Password"
        name="confirmPassword"
        value={registerForm.confirmPassword}
        onChange={onInputChange}
      />
      <Spacer y={2} />
      <Button onClick={onRegister} css={{ width: '100%', marginBottom: '.5rem' }}>
        Register
      </Button>
      <Text small>
        Already have an account? <Link href="/auth/login">Login</Link>
      </Text>
    </Container>
  );
};

export default RegisterScreen;
