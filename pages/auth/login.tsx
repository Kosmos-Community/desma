import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Input, Button, Text, Link, Spacer } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import validator from 'validator';

const LoginScreen = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setLoginForm({ ...loginForm, ...updatedValue });
  };

  const onFormSubmit = async () => {
    if (loginForm.email && loginForm.password) {
      if (!validator.isEmail(loginForm.email)) {
        setErrorMsg('Invalid Email');
        return;
      }

      setErrorMsg('');

      const response = await signIn('credentials', loginForm);
      console.log(response);

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

export default LoginScreen;
