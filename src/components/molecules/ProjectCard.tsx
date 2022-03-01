import { Card, Row, Text, Link } from '@nextui-org/react';
import React from 'react';

interface IProjectCard {
  name: string;
  projectID: string;
  seed: string;
}

const ProjectCard = ({ name, projectID, seed }: IProjectCard) => {
  return (
    <Link href={`designer/${projectID}`} css={{ maxWidth: '260px' }}>
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
            src={`https://avatars.dicebear.com/api/jdenticon/${projectID}${seed}.svg`}
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
    </Link>
  );
};

export default ProjectCard;
