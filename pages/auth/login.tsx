import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Input, Button, Text, Link, Spacer, Loading } from '@nextui-org/react';
import validator from 'validator';
import { withIronSessionSsr } from 'iron-session/next';
import { ironOptions } from '../../lib/config';
import { serverSidePropsAuth } from '../../lib/authServerSide';

const LoginScreen = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onInputChange = (event) => {
    const updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setLoginForm({ ...loginForm, ...updatedValue });
  };

  const onFormSubmit = async () => {
    if (!loginForm.email || !loginForm.password) {
      setErrorMsg('Please fill all fields');
      return;
    }

    if (!validator.isEmail(loginForm.email)) {
      setErrorMsg('Invalid Email');
      return;
    }

    setLoading(true);
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: loginForm.email,
        password: loginForm.password,
      }),
    });

    if (response.ok) {
      router.push('/dashboard');
    } else {
      setErrorMsg('Invalid Credentials');
    }

    setLoading(false);
  };

  const googleLogin = async () => {
    setLoading(true);
    const response = await fetch('/api/auth/google', {method: 'GET'});
    const {url} = await response.json();
    console.log(url);
    router.push(url);
    setLoading(false);
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
        <Link
          href="/"
          css={{
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          Desma
        </Link>
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
        {loading ? <Loading color="white" size="sm" /> : 'Login'}
      </Button>
      {/* Login with Google button */}
      <Button
        css={{ width: '100%', marginBottom: '.5rem' }}
        onClick={() => googleLogin()}
      >
        Login with Google
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

export const getServerSideProps = withIronSessionSsr(serverSidePropsAuth, ironOptions);

export default LoginScreen;
