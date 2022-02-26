import { Progress } from '@nextui-org/react';
import { EScaleFactor } from '../context/DesignContext';

const SCALES = {
  [EScaleFactor.GOLDEN_RATIO]: 1.618,
  [EScaleFactor.MAJOR_SECOND]: 1.125,
  [EScaleFactor.MAJOR_THIRD]: 1.25,
  [EScaleFactor.MINOR_SECOND]: 1.067,
  [EScaleFactor.MINOR_THIRD]: 1.2,
};

const MAX_SIZE = 385;

// Returns array of rem scales given a ScaleFactor
const scaleFactor = (scaleType: EScaleFactor, baseSize: number) => {
  const scale = SCALES[scaleType];
  const factor = [];
  let remValue = Number((1 / scale).toFixed(3));
  let value = 0;
  let i = 0;
  while (value < MAX_SIZE) {
    factor.push(remValue);
    const scaleValue = factor[i] * scale;
    remValue = Number(scaleValue.toFixed(3));
    value = remToPx(remValue, baseSize);
    i++;
  }

  return factor;
};

export const remToPx = (rem: number, baseSize: number): number => {
  const value = rem * baseSize;
  return Number(value.toFixed(2));
};

// Returns array of spacing objects for SpacingSection
const scaleSpacingRatio = (scales, baseSize: number) => {
  const spacings = [];
  const maxValue = remToPx(scales[scales.length - 1], baseSize);

  for (let i = 0; i < scales.length; i++) {
    let value = remToPx(scales[i], baseSize);
    value = (value * 100) / maxValue;
    spacings.push({
      name: `${i}`,
      space: `${scales[i]}rem`,
      pixels: `${remToPx(scales[i], baseSize)}px`,
      example: <Progress color="primary" value={value} css={{ w: maxValue }} />,
    });
  }

  return spacings;
};

export const handleSpacingScale = (scaleType: EScaleFactor, baseSize: number) => {
  const scales = scaleFactor(scaleType, baseSize);
  return scaleSpacingRatio(scales, baseSize);
};
