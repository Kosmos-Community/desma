import React, { useState } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';

import { hexToRgb } from '../../utils/colorConversion';
import ColorCard from '../atoms/ColorCard';
import { IColor } from '../../interfaces/IColor';

interface ICollection {
  id: string;
  name: string;
  colors: IColor[];
  color: string;
  isSectionSelected: boolean;
  showColorPicker?: (event: any) => void;
  setSectionId: (event: any) => void;
}

const ColorCollection = ({
  id,
  name,
  colors,
  color,
  isSectionSelected,
  showColorPicker,
  setSectionId,
}: ICollection) => {
  const [numCards, setNumCards] = useState(colors.length);

  const handleSection = (event: React.MouseEvent<HTMLInputElement>) => {
    setNumCards(colors.length + 1);
    showColorPicker(event);
    setSectionId(id);
  };
  return (
    <Card shadow={false} css={{ width: 'auto' }}>
      <Text h3>{name}</Text>
      <Grid.Container gap={2} css={{ marginTop: '$1', p: 0 }}>
        {colors.map((color, index) => (
          <Grid key={index}>
            <ColorCard hexCode={color.hexCode} rgbCode={hexToRgb(color.hexCode)} />
          </Grid>
        ))}

        {isSectionSelected && colors.length < 5 && (
          <Grid>
            <ColorCard hexCode={color} rgbCode={hexToRgb(color)} />
          </Grid>
        )}
        {numCards < 5 && (
          <Grid onClick={handleSection}>
            <ColorCard />
          </Grid>
        )}
      </Grid.Container>
    </Card>
  );
};

export default ColorCollection;
