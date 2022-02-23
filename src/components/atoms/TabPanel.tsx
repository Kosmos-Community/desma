import { Container } from '@nextui-org/react';

export const TabPanel = ({ children, ...props }) => {
  return (
    <Container css={{ padding: 0, display: 'flex' }} {...props}>
      {children}
    </Container>
  );
};
