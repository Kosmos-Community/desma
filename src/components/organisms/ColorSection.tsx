import React, { useState } from 'react';
import { Button, Card, Container, Input, Spacer } from '@nextui-org/react';
import { HexColorPicker } from 'react-colorful';

import { COLORS } from '../../__mocks__/colorCollection';
import ColorCollection from '../molecules/ColorCollection';

const ColorSection = () => {
  const [pickerState, setPickerState] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<string>('');
  const [color, setColor] = useState<string>('#aabbcc');

  const hideColorPicker = () => {
    if (pickerState) {
      addSectionColor();
    }
  };
  const showColorPicker = () => setPickerState(true);

  const handleColorPicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 1) return;
    setColor(`${e.target.value}`);
  };

  const addSectionColor = () => {
    const section = COLORS.find((color) => color.id === sectionId);
    if (section.colors.length < 5) section.colors.push({ id: '9', hexCode: color });
    setPickerState(false);
    setSectionId('');
  };

  return (
    <Container
      css={{
        m: 0,
        p: 0,
        width: '100%',
        position: 'relative',
      }}
    >
      <Container
        css={{ m: 0, p: 0, width: '100%', display: 'flex' }}
        onClick={hideColorPicker}
      >
        {COLORS.map((collection, index) => (
          <ColorCollection
            key={index}
            id={collection.id}
            name={collection.name}
            colors={collection.colors}
            color={color}
            isSectionSelected={sectionId === collection.id}
            showColorPicker={showColorPicker}
            setSectionId={setSectionId}
          />
        ))}
      </Container>

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
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default ColorSection;
