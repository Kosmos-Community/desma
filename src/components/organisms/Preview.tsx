import { Container, Card, Spacer, Text, Button } from '@nextui-org/react';

const Preview = () => {
  return (
    <Container>
      <Spacer y={2} />
      <Card color="primary" css={{ padding: '1rem 0 2rem 0' }}>
        <Container as="nav" css={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 24 }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clip-rule="evenodd"
              />
            </svg>
            <Text h1 size={24} color="white">
              Palette
            </Text>
          </div>
        </Container>
        <Container
          css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Text
            h2
            size={36}
            color="white"
            css={{ textAlign: 'center', marginBottom: '.5rem' }}
          >
            An Amazing Heading Title
          </Text>
          <Text h5 color="white" css={{ textAlign: 'center', marginBottom: '2rem' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, perferendis
            ratione explicabo.
          </Text>
          <Button auto css={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
            Call to Action
          </Button>
        </Container>
      </Card>
    </Container>
  );
};

export default Preview;
