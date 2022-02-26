import React from 'react';
import { Card, Grid, Text } from '@nextui-org/react';

import { hexToRgb } from '../../utils/colorConversion';
import ColorCard from '../atoms/ColorCard';
import { IColor } from '../../interfaces/IColor';
import { IPallette } from '../../context/DesignContext';

interface IColorCollection {
  collection: IPallette;
  color: string;
  newColor: IColor;
  showColorPicker?: (event: any) => void;
  addColor: (sectionId: string, colorId?: string, hexCode?: string) => void;
}

const ColorCollection = ({
  collection,
  color,
  newColor,
  showColorPicker,
  addColor,
}: IColorCollection) => {
  const { id, name, colors } = collection;

  const addNewColor = (event: React.MouseEvent<HTMLInputElement>) => {
    showColorPicker(event);
    addColor(id);
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
    addColor(id, colorId, hexCode);
  };
  return (
    <Card shadow={false} css={{ width: 'auto' }}>
      <Text h3>{name}</Text>
      <Grid.Container gap={2} css={{ marginTop: '$1', p: 0 }}>
        {colors.map((colorItem, index) => (
          <Grid key={index} onClick={handleColorSelected}>
            {colorItem.id !== newColor.id ? (
              <div
                id={colorItem.id}
                onClick={(e: any) =>
                  handleUpdateColor(e, colorItem.id, colorItem.hexCode)
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
