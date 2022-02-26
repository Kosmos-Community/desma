import { Grid, Spacer, Text } from '@nextui-org/react';
import AppLayout from '../src/components/templates/AppLayout';
import Feature from '../src/components/molecules/Feature';

const features = [
  {
    tag: 'Blazing Fast',
    title: 'Design Process',
    desc: 'Enhance your design process by usin an All-in-One webapp.',
  },
  {
    tag: 'Auto-Backup',
    title: 'Online Service',
    desc: 'Keep all your design systems uploaded on the cloud.',
  },
  {
    tag: 'Easy-to-Use',
    title: 'Friendly Interface',
    desc: 'Straight forward user interface, ready to use it.',
  },
];

const Index = () => {
  return (
    <AppLayout>
      <Spacer y={4} />
      <Text
        h1
        size={64}
        css={{
          lineHeight: '4.45rem',
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
      <Spacer y={4} />
      <Grid.Container gap={2} justify="center" css={{ textAlign: 'center' }}>
        {features.map((feature, index) => (
          <Grid key={index} css={{ maxWidth: '400px', lg: { flexBasis: '1fr' } }}>
            <Feature tag={feature.tag} title={feature.title} desc={feature.desc} />
          </Grid>
        ))}
      </Grid.Container>
    </AppLayout>
  );
};

export default Index;
