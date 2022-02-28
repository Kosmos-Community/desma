import { EScaleFactor } from '../context/DesignContext';

// TABLE HEADERS
export const SCALE_OPTIONS: EScaleFactor[] = [
  EScaleFactor.GOLDEN_RATIO,
  EScaleFactor.MAJOR_SECOND,
  EScaleFactor.MINOR_SECOND,
  EScaleFactor.MINOR_THIRD,
  EScaleFactor.MAJOR_THIRD,
];

export const TABLE_HEADERS = ['Name', 'Space', 'Pixels', ''];

// FONTS CONFIG
export const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=';
export const WEIGHT_QUERY = ':wght@400;700&display=swap';

// API URL
export const API_URL = 'https://desma-test.onrender.com/api';
export const DESIGN_USERS_URL = `${API_URL}/designSystem/users`;
export const DESIGN_URL = `${API_URL}/designSystem`;
export const AUTH_URL = `${API_URL}/users/login`;
export const PALETTE_URL = `${API_URL}/palette`;
export const FONT_URL = `${API_URL}/fonts`;
export const SPACING_URL = `${API_URL}/spacings`;
