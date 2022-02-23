import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

import { Card, Row, Text } from '@nextui-org/react';
import { IColor } from '../../interfaces/IColor';

const ColorCard = ({ hexCode, rgbCode }: IColor) => {
  const isColorCard = Boolean(hexCode);

  return isColorCard ? (
    <Card bordered shadow={false} css={{ width: '200px', height: '170px' }}>
      <Card.Body css={{ p: 0, bgColor: hexCode }} />
      <Card.Footer
        css={{ '*': { fontSize: '$xs' }, paddingTop: '$4', paddingBottom: '$4' }}
      >
        <Row wrap="wrap">
          <Row justify="space-between">
            <Text>HEX</Text>
            <Text>{hexCode}</Text>
          </Row>
          <Row justify="space-between">
            <Text>RGB</Text>
            <Text>{rgbCode}</Text>
          </Row>
        </Row>
      </Card.Footer>
    </Card>
  ) : (
    <Card clickable bordered shadow={false} css={{ width: '200px', height: '170px' }}>
      <Card.Body
        css={{
          p: 0,
          bgColor: '$white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IoMdAddCircleOutline color="#C1C1C1" size="2.5rem" />
      </Card.Body>
    </Card>
  );
};

export default ColorCard;
