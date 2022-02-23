import { Row, Col, Spacer, Text } from '@nextui-org/react';
import AppLayout from '../src/components/templates/AppLayout';

const Index = () => {
  return (
    <AppLayout>
      <Spacer y={3} />
      <Text
        h1
        size={64}
        css={{
          lineHeight: '100%',
          textGradient: '45deg, $purple400 25%, $blue500 100%',
          textAlign: 'center',
        }}
      >
        Save Time
        <br />
        by Designing Faster
      </Text>
      <Text h2 size={18} color="$gray300" css={{ textAlign: 'center' }}>
        Keep your Design Systems in on Place
      </Text>
    </AppLayout>
  );
};

export default Index;
