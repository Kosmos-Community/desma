import { Container, Text } from '@nextui-org/react';
import { SpaceBox } from '../src/components/atoms/SpaceBox';
import Table from '../src/components/molecules/Table';
import BaseTabs from '../src/components/molecules/Tabs';

const tableRows = [
  {
    name: 'H1',
    rem: '0.8',
    px: '11.2',
    boxSpace: <SpaceBox size={11.2} />,
  },
  {
    name: 'H2',
    rem: '0.8',
    px: '14',
    boxSpace: <SpaceBox size={14} />,
  },
  {
    name: 'H3',
    rem: '0.8',
    px: '17.5',
    boxSpace: <SpaceBox size={17.5} />,
  },
];

const tableHeaders = ['Name', 'Rem', 'Px', 'Preview'];

const Index = () => {
  return (
    <Container
      css={{
        width: '100%',
        padding: '8px',
        textAlign: 'center',
      }}
    >
      <Text
        small
        weight="medium"
        css={{
          color: 'white',
          textGradient: '45deg, $yellow500 -20%, $red500 100%',
        }}
      >
        Desma: a design system manager
      </Text>
      <BaseTabs />
      <Table tableHeaders={tableHeaders} tableRows={tableRows} />
      {' 🚀'}
    </Container>
  );
};

export default Index;
