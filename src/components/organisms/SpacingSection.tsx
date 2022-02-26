import { Container, Input } from '@nextui-org/react';
import React from 'react';

const SpacingSection = () => {
  return (
    <Container
      as="section"
      css={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Input label="Full Name" placeholder="Guillermo Rauch" />
      <select placeholder="Select Option" name="" id="">
        <option value="test1">Test 1</option>
        <option value="test1">Test 2</option>
        <option value="test1">Test 3</option>
        <option value="test1">Test 4</option>
      </select>
    </Container>
  );
};

export default SpacingSection;
