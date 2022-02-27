import { createContext, useContext } from 'react';
import { ICollection, IDesign } from '../interfaces/IDesign';
import { FONT, PALLETTE, SPACING } from '../__mocks__/designMocks';

export enum EScaleFactor {
  MINOR_SECOND = 'Minor Second',
  MAJOR_SECOND = 'Major Second',
  MINOR_THIRD = 'Minor Third',
  MAJOR_THIRD = 'Major Third',
  GOLDEN_RATIO = 'Golden Ratio',
}

export enum EDesignAction {
  SET_PALETTE = 'SET_PALETTE',
  SET_FONTS = 'SET_FONTS',
  SET_SPACING = 'SET_SPACING',
  SET_NAME = 'SET_NAME',
}

export const designData: IDesign = {
  name: 'Untitled Design',
  palette: PALLETTE,
  font: FONT,
  spacing: SPACING,
};

export const setDesignState = (state: ICollection, action): any => {
  switch (action.type) {
    case EDesignAction.SET_PALETTE:
      return {
        ...state,
        palette: action.payload,
      };

    case EDesignAction.SET_FONTS:
      return {
        ...state,
        font: action.payload,
      };

    case EDesignAction.SET_SPACING:
      return {
        ...state,
        spacing: action.payload,
      };
    case EDesignAction.SET_NAME:
      return {
        ...state,
        name: action.payload,
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
