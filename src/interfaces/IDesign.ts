import { Dispatch } from 'react';
import { EDesignAction, EScaleFactor } from '../context/DesignContext';
import { FONT, PALLETTE } from '../__mocks__/designMocks';

export interface IColor {
  _id?: string;
  hexCode?: string;
  rgbCode?: string;
}

export interface IPallette {
  primaryColor: IColor[];
  secondaryColor: IColor[];
  textColor: IColor[];
  backgroundColors: IColor[];
  extraColors: IColor[];
  _id?: string;
}

export interface IFonts {
  id?: string;
  headingFontName: string;
  parragraphFontName: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

export interface ISpacing {
  id?: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

export interface IDesign {
  _id?: any;
  name: string;
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
