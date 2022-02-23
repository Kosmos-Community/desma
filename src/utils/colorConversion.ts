export const hexToRgb = (hex: string): string => {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!hexRegex) return null;

  const r = parseInt(hexRegex[1], 16);
  const g = parseInt(hexRegex[2], 16);
  const b = parseInt(hexRegex[3], 16);

  return `${r} ${g} ${b}`;
};
