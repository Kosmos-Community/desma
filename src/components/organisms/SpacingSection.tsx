import { Container, Input } from '@nextui-org/react';
import React, { useEffect } from 'react';
import useDesignContext, {
  EDesignAction,
  EScaleFactor,
} from '../../context/DesignContext';
import Table from '../molecules/Table';

const SpacingSection = () => {
  const { designData, setDesignState } = useDesignContext();

  useEffect(() => {
    setDesignState({
      payload: { baseSize: 10, scaleFactor: EScaleFactor.GOLDEN_RATIO },
      type: EDesignAction.SET_SPACING,
    });
  }, []);

  console.log(designData);

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

      {/* <Table /> */}
    </Container>
  );
};

export default SpacingSection;
