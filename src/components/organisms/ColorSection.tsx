import React, { useEffect, useState } from 'react';
import { Container } from '@nextui-org/react';

import { COLORS } from '../../__mocks__/colorCollection';
import ColorCollection from '../molecules/ColorCollection';
import ColorPicker from '../molecules/ColorPicker';

const ColorSection = () => {
  const [pickerState, setPickerState] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const [newColor, setNewColor] = useState({ id: '-1', hexCode: '#000000' });

  const colorSections = COLORS;

  // Adds a new color to a ICollection colors array when setting a new IColor
  useEffect(() => {
    const section = colorSections.find((colorSection) => colorSection.id === sectionId);
    if (!section) return;
    if (section.colors.length >= 5) return;
    const colorsId = section.colors.map((color) => color.id);
    if (colorsId.includes(newColor.id)) return;

    section.colors.push(newColor);
    const tempColor = color.slice(0, -1);
    setColor(`${tempColor}${section.colors.length}`);
  }, [newColor]);

  const hideColorPicker = () => {
    saveColorValue();
    setPickerState(false);
  };

  const showColorPicker = () => setPickerState(true);

  // Sets a new IColor
  const addSectionColor = (id) => {
    if (newColor && newColor.id !== '-1') saveColorValue();
    setSectionId(id);
    setNewColor({ id: `${Math.random()}`, hexCode: color });
  };

  // Updates IColor selected in a ICollection
  const updateColor = (sectionId, colorId, hexCode) => {
    if (newColor && newColor.id !== '-1') saveColorValue();
    setSectionId(sectionId);
    setColor(hexCode);
    setNewColor({ id: colorId, hexCode: color });
  };

  const deleteColor = () => {
    const section = colorSections.find((colorSection) => colorSection.id === sectionId);
    if (!section) return;
    section.colors = section.colors.filter((color) => color.id !== newColor.id);
    const tempColor = color.slice(0, -1);

    setColor(`${tempColor}${section.colors.length}`);
  };

  const saveColorValue = (collectionId = sectionId, colorId = newColor.id) => {
    const section = colorSections.find(
      (colorSection) => colorSection.id === collectionId
    );
    if (!section) return;
    const colorSelected = section.colors.find((item) => item.id === colorId);
    if (!colorSelected) return;
    colorSelected.hexCode = color;
  };

  return (
    <>
      <Container
        css={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          zIndex: '-1',
          top: 0,
          left: 0,
        }}
        onClick={hideColorPicker}
      />
      <Container
        as="section"
        css={{
          width: '100%',
          position: 'relative',
        }}
      >
        <Container css={{ m: 0, p: 0, width: '100%', display: 'flex' }}>
          {colorSections.map((collection, index) => (
            <ColorCollection
              key={index}
              collection={collection}
              color={color}
              newColor={newColor}
              showColorPicker={showColorPicker}
              addSectionColor={addSectionColor}
              updateColor={updateColor}
            />
          ))}
        </Container>

        <ColorPicker
          pickerState={pickerState}
          color={color}
          setColor={setColor}
          addSectionColor={hideColorPicker}
          deleteColor={deleteColor}
        />
      </Container>
    </>
  );
};

export default ColorSection;
