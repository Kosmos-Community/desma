import { Card, Row, Text } from '@nextui-org/react';
import React from 'react';

interface IProjectCard {
  name: string;
  projectID: string;
}

const ProjectCard = ({ name, projectID }: IProjectCard) => {
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
          minHeight: '150px',
          backgroundColor: '#161316',
          alignSelf: 'center',
          justifySelf: 'center',
          flexDirection: 'column',
          p: '1rem',
          '> span > img': {
            objectFit: 'cover',
          },
        }}
        align="center"
      >
        <img
          src={`https://avatars.dicebear.com/api/jdenticon/${name}${projectID}.svg`}
          style={{ objectFit: 'cover' }}
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
