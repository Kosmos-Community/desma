import { Container, Input, Button, Text, Link, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import validator from 'validator';

const RegisterScreen = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setRegisterForm({ ...registerForm, ...updatedValue });
  };

  const onRegister = () => {
    if (registerForm.email && registerForm.password && registerForm.confirmPassword) {
      if (!validator.isEmail(registerForm.email)) {
        setErrorMsg('Email is not valid');
        return;
      }

      if (registerForm.password != registerForm.confirmPassword) {
        setErrorMsg("Passwords doesn't match");
        return;
      }

      setErrorMsg('');
      // Send API Call
      console.log(registerForm);
      return;
    }

    setErrorMsg('Please fill all fields');
    return;
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
        <Link href="/">Desma</Link>
      </Text>

      <Spacer y={2} />
      <Input
        labelPlaceholder="Name"
        name="name"
        value={registerForm.name}
        onChange={onInputChange}
      />
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
      <Text
        small
        weight="bold"
        color="white"
        hidden={errorMsg == ''}
        css={{
          width: '100%',
          padding: '.2rem',
          backgroundColor: '#EF4444',
          position: 'absolute',
          bottom: '0',
          left: '0',
          textAlign: 'center',
        }}
      >
        {errorMsg}
      </Text>
    </Container>
  );
};

export default RegisterScreen;
