import React, { useEffect, useState } from 'react';
import { Container } from '@nextui-org/react';

import ColorCollection from '../molecules/ColorCollection';
import ColorPicker from '../molecules/ColorPicker';
import useDesignContext, { EDesignAction } from '../../context/DesignContext';

const ColorSection = () => {
  const [pickerState, setPickerState] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const [newColor, setNewColor] = useState({ id: '-1', hexCode: '#000000' });
  const { designData, setDesignState } = useDesignContext();

  const { palette } = designData;

  // Adds a new color to a ICollection colors array when setting a new IColor
  useEffect(() => {
    const newPalette = [...palette];
    const section = newPalette.find((colorSection) => colorSection.id === sectionId);
    if (!section) return;
    if (section.colors.length >= 5) return;
    const colorsId = section.colors.map((color) => color.id);
    if (colorsId.includes(newColor.id)) return;
    section.colors.push(newColor);

    setDesignState({ payload: newPalette, type: EDesignAction.SET_PALETTE });
  }, [newColor]);

  const hideColorPicker = () => {
    saveColorValue();
    setPickerState(false);
  };

  const showColorPicker = () => setPickerState(true);

  // Updates IColor selected in an ICollection
  const updateColor = (sectionId, colorId = `${Math.random()}`, hexCode = color) => {
    if (newColor && newColor.id !== '-1') saveColorValue();
    setSectionId(sectionId);
    setColor(hexCode);
    setNewColor({ id: colorId, hexCode: color });
  };

  const deleteColor = () => {
    const newPalette = [...palette];
    const section = newPalette.find((colorSection) => colorSection.id === sectionId);
    if (!section) return;
    section.colors = section.colors.filter((color) => color.id !== newColor.id);
    setDesignState({ payload: newPalette, type: EDesignAction.SET_PALETTE });
  };

  const saveColorValue = (paletteId = sectionId, colorId = newColor.id) => {
    const section = palette.find((colorSection) => colorSection.id === paletteId);
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
          {palette.map((collection, index) => (
            <ColorCollection
              key={index}
              collection={collection}
              color={color}
              newColor={newColor}
              showColorPicker={showColorPicker}
              addColor={updateColor}
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
