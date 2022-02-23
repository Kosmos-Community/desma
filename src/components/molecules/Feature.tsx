import { Card, Spacer, Text } from '@nextui-org/react';

const Feature = ({ tag, title, desc }) => {
  return (
    <Card color="primary" css={{ padding: '.5rem' }}>
      <Text h6 size={14} color="$blue200">
        {tag}
      </Text>
      <Text h5 size={24} color="white">
        {title}
      </Text>
      <Spacer y={1} />
      <Text h6 size={18} color="$blue100" css={{ lineHeight: '120%' }}>
        {desc}
      </Text>
    </Card>
  );
};

export default Feature;
