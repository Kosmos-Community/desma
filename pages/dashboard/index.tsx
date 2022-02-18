import { Button, Container, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import ProjectCard from '../../src/components/molecules/ProjectCard';

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

const Home = () => {
  return (
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
          <Text css={{ color: '$gray600' }}>0 Design Systems generated</Text>
        </Container>
        <Button color="gradient" css={{ marginTop: '1rem' }}>
          New Design System
        </Button>
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
  );
};

export default Home;
