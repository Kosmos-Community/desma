import React, { useEffect, useState } from 'react';
import { Container } from '@nextui-org/react';
import validator from 'validator';
import ColorCollection from '../molecules/ColorCollection';
import ColorPicker from '../molecules/ColorPicker';
import useDesignContext, { EDesignAction } from '../../context/DesignContext';
import { IColor } from '../../interfaces/IDesign';

const ColorSection = () => {
  const [pickerState, setPickerState] = useState<boolean>(false);
  const [sectionId, setSectionId] = useState<string>('');
  const [color, setColor] = useState<string>('#000000');
  const [newColor, setNewColor] = useState({ _id: '-1', hexCode: '#000000' });
  const { designData, setDesignState } = useDesignContext();

  const { palette } = designData;
  const { _id, ...paletteWithoutId } = palette;

  // Adds a new color to a ICollection colors array when setting a new IColor
  useEffect(() => {
    const newPalette = { ...palette };
    const section: IColor[] = palette[sectionId];
    if (!section) return;
    if (section.length >= 5) return;
    const colorsId = section.map((color) => color._id);
    if (colorsId.includes(newColor._id)) return;
    section.push(newColor);

    setDesignState({ payload: newPalette, type: EDesignAction.SET_PALETTE });
  }, [newColor]);

  const hideColorPicker = () => {
    if(!validator.isHexColor(color))return;
    saveColorValue();
    setPickerState(false);
  };

  const showColorPicker = () => setPickerState(true);

  // Updates IColor selected in an ICollection
  const updateColor = (sectionId, colorId = `${Math.random()}`, hexCode = color) => {
    if (newColor && newColor._id !== '-1') saveColorValue();
    setSectionId(sectionId);
    setColor(hexCode);
    setNewColor({ _id: colorId, hexCode: color });
  };

  const deleteColor = () => {
    const newPalette = { ...palette };
    let section = newPalette[sectionId];
    if (!section) return;
    newPalette[sectionId] = section.filter((color) => {
      return color._id !== newColor._id;
    });
    setDesignState({ payload: newPalette, type: EDesignAction.SET_PALETTE });
    setPickerState(false);
  };

  const saveColorValue = (paletteId = sectionId, colorId = newColor._id) => {
    const newPalette = { ...palette };

    const section = newPalette[paletteId];
    if (!section) return;
    const colorSelected = section.find((item) => item._id === colorId);
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
          {Object.keys(paletteWithoutId).map((paletteName, index) => (
            <ColorCollection
              key={index}
              paletteName={paletteName}
              colors={paletteWithoutId[paletteName]}
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
