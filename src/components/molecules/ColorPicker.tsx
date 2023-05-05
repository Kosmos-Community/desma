import React, { useState } from 'react';
import { Button, Card, Input, Spacer } from '@nextui-org/react';
import { HexColorPicker } from 'react-colorful';

import validator from 'validator';

const ColorPicker = ({ pickerState, color, setColor, addSectionColor, deleteColor }) => {
  const [errorMsg, setErrorMsg] = useState(false);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) return;
    if (!validator.isHexadecimal(e.target.value.substring(1)) && e.target.value.substring(1).length > 0) {
      setErrorMsg(true);
      return;
    }
    setColor(`${e.target.value}`);
    setErrorMsg(false);
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
        <>
        {errorMsg && <div style={{ color: 'red', width: 'min-content' }}>Only enter valid hex characters</div>}
        <Input
          value={color}
          bordered
          label="HEX"
          placeholder="#ffffff"
          maxLength={7}
          onChange={handleColorPicker}
        />
        </>
        
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
