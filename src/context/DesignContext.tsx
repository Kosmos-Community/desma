import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { COLORS } from '../__mocks__/colorCollection';

export enum EScaleFactor {
  MINOR_SECOND = 'Minor Second',
  MAJOR_SECOND = 'Major Second',
  MINOR_THIRD = 'Minor Third',
  MAJOR_THIRD = 'Major Third',
  GOLDEN_RATIO = 'Golden Ratio',
}

interface IColor {
  id?: string;
  hexCode?: string;
  rgbCode?: string;
}

interface IPallette {
  id?: string;
  name: string;
  colors: IColor[] | null;
}

interface IFonts {
  id?: string;
  headingFontName: string;
  paragraphFontName: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

interface ISpacing {
  id?: string;
  baseSize: number;
  scaleFactor: EScaleFactor;
}

interface IDesign {
  palette: IPallette[];
  font: IFonts;
  spacing: ISpacing;
}

export interface ICollection {
  designData: IDesign;
  setDesignState?: Dispatch<any>;
}

const SPACING: ISpacing = {
  baseSize: 16,
  scaleFactor: EScaleFactor.MINOR_SECOND,
};

const FONT: IFonts = {
  headingFontName: 'Inter',
  paragraphFontName: 'Inter',
  baseSize: 16,
  scaleFactor: EScaleFactor.MINOR_SECOND,
};

export const designData: IDesign = {
  palette: COLORS,
  font: FONT,
  spacing: SPACING,
};

export const SET_PALETTE = 'SET_PALETTE';
export const SET_FONT = 'SET_FONT';
export const SET_SPACING = 'SET_SPACING';

export const setDesignState = (state: ICollection, action): any => {
  switch (action.type) {
    case SET_PALETTE:
      return {
        ...state,
        palette: action.payload,
      };

    case SET_FONT:
      return {
        ...state,
        font: action.payload,
      };

    case SET_SPACING:
      return {
        ...state,
        spacing: action.payload,
      };

    default: {
      return state;
    }
  }
};

const DesignContext = createContext<ICollection>({ designData });

export const DesignProvider = DesignContext.Provider;

const useDesignContext = () => {
  const { designData, setDesignState } = useContext(DesignContext);

  return { designData, setDesignState };
};

export default useDesignContext;
