import { globalCss, keyframes } from '@nextui-org/react';

const slideIn = keyframes({
  '0%': { transform: 'translateY(0)' },
  '100%': { transform: 'translateY(-2px)' },
});

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  select: {
    padding: '0.625rem 24px 0.625rem 10px',
    backgroundColor: 'transparent',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    border: '2px solid #EAEAEA',
    borderRadius: '12px',
    appearance: 'none',
    fontSize: '0.875rem',
    '&:focus': { border: '2px solid black', animation: `${slideIn} 200ms forwards` },
  },
});
