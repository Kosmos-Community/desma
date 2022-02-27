import { Dispatch } from 'react';
import { EDesignAction, EScaleFactor } from '../context/DesignContext';
import { FONT, PALLETTE } from '../__mocks__/designMocks';

export interface IColor {
  id?: string;
  hexCode?: string;
  rgbCode?: string;
}

export interface IPallette {
  id?: string;
  primaryColor: IColor[];
  secondaryColor: IColor[];
  textColor: IColor[];
  backgroundColor: IColor[];
  extraColors: IColor[];
}

export interface IFonts {
  id?: string;
  headingFontName: string;
  paragraphFontName: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

export interface ISpacing {
  id?: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

export interface IDesign {
  palette: IPallette;
  font: IFonts;
  spacing: ISpacing;
}

export interface ICollectionDispatcher {
  payload: IPallette | IFonts | ISpacing;
  type: EDesignAction;
}

export interface ICollection {
  designData: IDesign;
  setDesignState?: Dispatch<ICollectionDispatcher>;
}

