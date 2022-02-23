import { Avatar, Button, Container, Spacer, Text } from '@nextui-org/react';
import Link from 'next/link';
import React, { useState } from 'react';
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
