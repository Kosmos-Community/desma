import { Card, Container, Text } from '@nextui-org/react';
import React from 'react';

interface IProjectCard {
  name: string;
}

const ProjectCard = ({ name }: IProjectCard) => {
  return (
    <Card
      css={{
        margin: 0,
        padding: 0,
        borderRadius: '$xs',
        '> div': { padding: 0 },
      }}
    >
      <Container css={{ width: '100%', height: '100px', backgroundColor: '$accents3' }} />
      <Text
        css={{
          padding: '.75rem',
        }}
      >
        {name}
      </Text>
    </Card>
  );
};

export default ProjectCard;
