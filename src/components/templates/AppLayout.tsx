import { Avatar, Button, Container, keyframes, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';

const scaleUp = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.05)' },
  '100%': { transform: 'scale(1)' },
});

const AppLayout = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const overMenu = () => {
    setShowMenu(true);
  };

  const outMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <Container
        css={{
          backgroundColor: '$gray800',
          p: '.5rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          width: '100%',
          height: '60px',
          maxWidth: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Container
          css={{ paddingBottom: '1rem', margin: 0, width: 'auto', position: 'relative' }}
          onMouseOver={overMenu}
          onMouseOut={outMenu}
        >
          <Avatar squared pointer text="Pedro" />
          <Button.Group
            size="md"
            vertical
            auto
            css={{
              position: 'absolute',
              right: 5,
              zIndex: 1000,
              boxShadow: 'var(--nextui-shadows-md)',
              display: showMenu ? 'flex' : 'none',
              animation: `${scaleUp} 200ms`,
              '> button': { backgroundColor: '$white', color: '$accents8' },
            }}
          >
            <Link href="/">
              <Button>Home</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
            <Link href="/account">
              <Button>Account</Button>
            </Link>
            <Link href="/">
              <Button>Sign out</Button>
            </Link>
          </Button.Group>
        </Container>
      </Container>
      <Spacer y={3} />
      <Container css={{ paddingLeft: 0, paddingRight: 0 }}>{children}</Container>
    </>
  );
};

export default AppLayout;
