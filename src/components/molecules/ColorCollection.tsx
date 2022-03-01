import React from 'react';
import { Card, Grid, Text } from '@nextui-org/react';

import { hexToRgb } from '../../utils/colorConversion';
import ColorCard from '../atoms/ColorCard';
import { IColor } from '../../interfaces/IDesign';

interface IColorCollection {
  color: string;
  paletteName: string;
  colors: IColor[];
  newColor: IColor;
  showColorPicker?: (event: any) => void;
  addColor: (sectionId: string, colorId?: string, hexCode?: string) => void;
}

const ColorCollection = ({
  paletteName,
  colors,
  color,
  newColor,
  showColorPicker,
  addColor,
}: IColorCollection) => {
  const name = paletteName.charAt(0).toUpperCase() + paletteName.slice(1);

  const addNewColor = (event: React.MouseEvent<HTMLInputElement>) => {
    showColorPicker(event);
    addColor(paletteName);
  };

  const handleColorSelected = (event: React.MouseEvent<HTMLInputElement>) => {
    showColorPicker(event);
  };

  const handleUpdateColor = (
    event: React.MouseEvent<HTMLInputElement>,
    colorId: string,
    hexCode: string
  ) => {
    showColorPicker(event);
    addColor(paletteName, colorId, hexCode);
  };

  return (
    <Card shadow={false} css={{ width: 'auto' }}>
      <Text h3>{name}</Text>
      <Grid.Container gap={2} css={{ marginTop: '$1', p: 0 }}>
        {colors.map((colorItem, index) => (
          <Grid key={index} onClick={handleColorSelected}>
            {colorItem._id !== newColor._id ? (
              <div
                id={colorItem._id}
                onClick={(e: any) =>
                  handleUpdateColor(e, colorItem._id, colorItem.hexCode)
                }
              >
                <ColorCard
                  hexCode={colorItem.hexCode}
                  rgbCode={hexToRgb(colorItem.hexCode)}
                />
              </div>
            ) : (
              <ColorCard hexCode={color} rgbCode={hexToRgb(color)} />
            )}
          </Grid>
        ))}
        {colors.length < 5 && (
          <Grid onClick={addNewColor}>
            <ColorCard />
          </Grid>
        )}
      </Grid.Container>
    </Card>
  );
};

export default ColorCollection;
