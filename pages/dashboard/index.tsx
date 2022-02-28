import React, { useEffect } from 'react';
import { Button, Container, Link, Spacer, Text } from '@nextui-org/react';
import { withIronSessionSsr } from 'iron-session/next';

import ProjectCard from '../../src/components/molecules/ProjectCard';
import AppLayout from '../../src/components/templates/AppLayout';
import { ironOptions } from '../../lib/config';
import { serverSidePropsProtected } from '../../lib/authServerSide';
import useUserContext from '../../src/context/UserContext';

const DESIGN_SYSTEMS = [
  {
    name: 'My First Design',
  },
  {
    name: 'My Second Design',
  },
  {
    name: 'My Third Design',
  },
  {
    name: 'My Fourth Design',
  },
];

const Home = ({ user }) => {
  const { setUserData } = useUserContext();

  useEffect(() => {
    if (!user) return;
    setUserData(user);
  }, [user, setUserData]);

  return (
    <AppLayout>
      <Container
        css={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Container
          css={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0,
          }}
        >
          <Container
            css={{ padding: 0, margin: 0, width: 'auto', display: 'grid', gap: '.75rem' }}
          >
            <Text h1 css={{ lineHeight: '3.5rem' }}>
              My Design Systems
            </Text>
            <Text css={{ color: '$gray600' }}>
              {DESIGN_SYSTEMS.length} Design System generated
            </Text>
          </Container>
          <Link href="/designer">
            <Button color="gradient" css={{ marginTop: '1rem' }}>
              New Design System
            </Button>
          </Link>
        </Container>
        {DESIGN_SYSTEMS.length <= 0 ? (
          <>
            <Spacer y={10} />
            <Button bordered color="gradient">
              Add Design System
            </Button>
          </>
        ) : (
          <>
            <Spacer />
            <Container
              css={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat( auto-fit, minmax(280px, 1fr) )',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                gap: '1rem',
              }}
            >
              {DESIGN_SYSTEMS.map((project, index) => (
                <ProjectCard key={index} name={project.name} />
              ))}
            </Container>
          </>
        )}
      </Container>
    </AppLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(
  serverSidePropsProtected,
  ironOptions
);

export default Home;
