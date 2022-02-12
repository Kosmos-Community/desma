import { Container, Input, Button, Text, Link, Spacer } from '@nextui-org/react';

const RegisterScreen = () => {
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
      <Input labelPlaceholder="Email" />
      <Spacer y={2} />
      <Input.Password labelPlaceholder="Password" />
      <Spacer y={2} />
      <Input.Password labelPlaceholder="Confirm Password" />
      <Spacer y={2} />
      <Button css={{ width: '100%', marginBottom: '.5rem' }}>Register</Button>
      <Text small>
        Already have an account? <Link href="/auth/login">Login</Link>
      </Text>
    </Container>
  );
};

export default RegisterScreen;
