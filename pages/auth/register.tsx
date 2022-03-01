import { Container, Input, Button, Text, Link, Spacer, Loading } from '@nextui-org/react';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import validator from 'validator';
import { serverSidePropsAuth } from '../../lib/authServerSide';
import { ironOptions } from '../../lib/config';

const RegisterScreen = () => {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setRegisterForm({ ...registerForm, ...updatedValue });
  };

  const onRegister = async () => {
    if (!registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setErrorMsg('Please fill all fields');
      return;
    }

    if (!validator.isEmail(registerForm.email)) {
      setErrorMsg('Email is not valid');
      return;
    }

    if (registerForm.password != registerForm.confirmPassword) {
      setErrorMsg("Passwords doesn't match");
      return;
    }

    // Clear the Error Message if any
    setErrorMsg('');
    setLoading(true);

    const reqRegister = await fetch('https://desma-test.onrender.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      }),
    });

    if (reqRegister.status == 400) {
      setErrorMsg('Email already exists');
      setLoading(false);
      return;
    }

    if (reqRegister.status == 201) {
      // Update user data to login
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      if (response.ok) {
        // Redirect to dashboard
        router.push('/dashboard');
      }
    }

    setLoading(false);

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
        {loading ? <Loading color="white" size="sm" /> : 'Register'}
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

export const getServerSideProps = withIronSessionSsr(serverSidePropsAuth, ironOptions);

export default RegisterScreen;
