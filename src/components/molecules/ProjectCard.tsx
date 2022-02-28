import { Button, Card, Container, Row, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { HiColorSwatch } from 'react-icons/hi';
import Preview from '../organisms/Preview';

interface IProjectCard {
  name: string;
}

const ProjectCard = ({ name }: IProjectCard) => {
  return (
    <Card
      clickable
      css={{
        margin: 0,
        padding: 0,
        borderRadius: '$xs',
        '> div': { padding: 0 },
      }}
    >
      <Row
        css={{
          width: '100%',
          backgroundColor: 'black',
          alignSelf: 'center',
          justifySelf: 'center',
          flexDirection: 'column',
          p: '1rem',
        }}
        align="center"
      >
        <Text color="white" h4>
          Design System
        </Text>
        <Button
          size="xs"
          icon={<HiColorSwatch color="white" />}
          css={{ marginTop: '.5rem' }}
        />
      </Row>
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
