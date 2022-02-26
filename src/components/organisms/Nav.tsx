import { Container, Text, Link, Button, Avatar, keyframes } from '@nextui-org/react';
import { useState } from 'react';
import { HiHome, HiUserCircle, HiOutlineLogout } from 'react-icons/hi';
import useUserContext from '../../context/UserContext';

const Nav = () => {
  const { userData, setUserData } = useUserContext();
  const [avatarHovered, setAvatarHovered] = useState<boolean>(false);
  let onMouseLeavingAvatar;

  console.log(userData);

  const slideIn = keyframes({
    '0%': { transform: 'translateY(-5px)' },
    '100%': { transform: 'translateY(0)' },
  });

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
    <div
      style={{ position: 'relative' }}
      onMouseOver={() => {
        clearTimeout(onMouseLeavingAvatar);
        setAvatarHovered(true);
      }}
      onMouseLeave={() => {
        onMouseLeavingAvatar = setTimeout(() => {
          setAvatarHovered(false);
        }, 200);
      }}
    >
      <Avatar
        src={`https://avatars.dicebear.com/api/micah/${userData.email}.svg`}
        text="Reyes"
        color="gradient"
        bordered
        squared
        css={{ cursor: 'pointer' }}
      />
      <Button.Group
        size="md"
        vertical
        css={{
          position: 'absolute',
          top: '100%',
          right: 0,
          transform: 'translate(0, 0)',
          display: avatarHovered ? 'flex' : 'none',
          animation: `${slideIn} 200ms`,
          zIndex: 1000,
        }}
      >
        <Button>
          <Link href="/dashboard" css={{ color: 'white' }}>
            <HiHome style={{ marginRight: '.5rem' }} />
            Home
          </Link>
        </Button>

        <Button>
          <Link href="#" css={{ color: 'white' }}>
            <HiUserCircle style={{ marginRight: '.5rem' }} />
            Account
          </Link>
        </Button>
        <Button>
          <Link href="#" css={{ color: 'white' }}>
            <HiOutlineLogout style={{ marginRight: '.5rem' }} />
            Sign Out
          </Link>
        </Button>
      </Button.Group>
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
        <Link href={userData.token ? '/dashboard' : '/'}>
          <Text
            h2
            size={24}
            css={{ textGradient: '45deg, $yellow500 -20%, $red500 100%' }}
          >
            Desma
          </Text>
        </Link>
        {userData.token ? loggedInOptions : loggedOutOptions}
      </nav>
    </Container>
  );
};

export default Nav;
