import React from 'react';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ pickerState, color, setColor, addSectionColor, deleteColor }) => {
  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) return;
    setColor(`${e.target.value}`);
  };

  return (
    <Card
      shadow={false}
      bordered
      css={{
        display: pickerState ? 'block' : 'none',
        position: 'absolute',
        right: 0,
        top: 20,
        width: 'auto',
      }}
    >
      <Card.Body>
        <HexColorPicker color={color} onChange={setColor} />
      </Card.Body>
      <Card.Footer css={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          value={color}
          bordered
          label="HEX"
          placeholder="#ffffff"
          maxLength={7}
          onChange={handleColorPicker}
        />
        <Spacer y={2} />
        <Button onClick={addSectionColor}>Save Color</Button>

        <Button bordered color="error" css={{ marginTop: '.5rem' }} onClick={deleteColor}>
          Delete Color
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default ColorPicker;
