import React  from 'react';
import { Container } from '@nextui-org/react';
import Nav from '../organisms/Nav';

const AppLayout = ({ children }) => {
  return (
    <Container lg css={{ padding: 0 }}>
      <Nav />
      <Container>{children}</Container>
    </Container>
  );
};

export default AppLayout;
