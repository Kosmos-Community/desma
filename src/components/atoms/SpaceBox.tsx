import { Container } from '@nextui-org/react';

export const SpaceBox = ({ size }: { size: number }) => {
  return (
    <Container
      css={{
        backgroundColor: '$black',
        width: size,
        height: 0,
        paddingTop: size,
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
      }}
    />
  );
};
