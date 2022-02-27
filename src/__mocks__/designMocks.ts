import { IFonts, IPallette, ISpacing } from '../interfaces/IDesign';

export enum EScaleFactor {
  MINOR_SECOND = 'Minor Second',
  MAJOR_SECOND = 'Major Second',
  MINOR_THIRD = 'Minor Third',
  MAJOR_THIRD = 'Major Third',
  GOLDEN_RATIO = 'Golden Ratio',
}

export const PALLETTE: IPallette = {
  id: '',
  primaryColor: [],
  secondaryColor: [],
  textColor: [],
  backgroundColor: [],
  extraColors: [],
};

export const SPACING: ISpacing = {
  baseSize: 16,
  scaleFactor: EScaleFactor.MINOR_SECOND,
};

export const FONT: IFonts = {
  headingFontName: 'Inter',
  paragraphFontName: 'Inter',
  baseSize: 16,
  scaleFactor: EScaleFactor.MINOR_SECOND,
};
