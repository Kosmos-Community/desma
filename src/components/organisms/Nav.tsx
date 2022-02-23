import { Container, Text, Link, Button, Avatar } from '@nextui-org/react';
import { useState } from 'react';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loggedOutOptions = (
    <div style={{ display: 'flex' }}>
      <Link href="/auth/register">
        <Button light auto>
          Register
        </Button>
      </Link>
      <Link href="/auth/login">
        <Button auto color="gradient">
          Login
        </Button>
      </Link>
    </div>
  );

  const loggedInOptions = (
    <div>
      <Avatar
        src="https://reyes.cool/_next/image?url=%2Favatar.jpeg&w=96&q=75"
        text="Reyes"
        color="gradient"
        bordered
        squared
        css={{ cursor: 'pointer' }}
      />
    </div>
  );

  return (
    <Container
      css={{
        marginBottom: '2rem',
        padding: '1rem',
        borderBottom: '1px solid rgba(0,0,0,.1)',
      }}
    >
      <nav style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href={isLoggedIn ? '/dashboard' : '/'}>
          <Text
            h2
            size={24}
            css={{ textGradient: '45deg, $yellow500 -20%, $red500 100%' }}
          >
            Desma
          </Text>
        </Link>
        {isLoggedIn ? loggedInOptions : loggedOutOptions}
      </nav>
    </Container>
  );
};

export default Nav;
