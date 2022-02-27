import { Container, Input, Row, Spacer } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import useDesignContext, { EDesignAction } from '../../context/DesignContext';
import { SCALE_OPTIONS, TABLE_HEADERS } from '../../utils/constants';
import { handleSpacingScale } from '../../utils/scaleFactor';
import Dropdown from '../atoms/Dropdown';
import Table from '../molecules/Table';

const SpacingSection = () => {
  const { designData, setDesignState } = useDesignContext();
  const [baseSize, setBaseSize] = useState(designData.spacing.baseSize);
  const [scaleFactor, setScaleFactor] = useState(designData.spacing.scaleFactor);

  const spacings = handleSpacingScale(scaleFactor, baseSize);
  const TABLE_ROWS = [...spacings];

  useEffect(() => {
    setDesignState({
      payload: { baseSize, scaleFactor },
      type: EDesignAction.SET_SPACING,
    });
  }, [baseSize, scaleFactor, setDesignState]);

  const handleBaseSize = (e) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    setBaseSize(value);
  };

  return (
    <Container
      as="section"
      css={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Spacer />
      <Row>
        <Input
          label="Base size"
          bordered
          placeholder="14"
          type="number"
          value={`${baseSize}`}
          min={1}
          onChange={handleBaseSize}
        />
        <Spacer />
        <Dropdown
          options={SCALE_OPTIONS}
          label="Scale Factor"
          placeholder="Select your option"
          value={scaleFactor}
          onChange={(e) => setScaleFactor(e.target.value)}
        />
      </Row>
      <Spacer />
      <Table tableHeaders={TABLE_HEADERS} tableRows={TABLE_ROWS} />
    </Container>
  );
};

export default SpacingSection;
