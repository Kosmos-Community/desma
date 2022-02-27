import { Container } from '@nextui-org/react';
import React from 'react';

const FontContainer = ({ headingFontName, children, fontWeight }) => {
  return (
    <Container
      css={{
        m: 0,
        p: 0,
        width: 'fit-content',
        maxWidth: '520px',
        lineHeight: '2.25rem',
        overflowWrap: 'break-word',
        '*': {
          fontWeight: fontWeight,
          fontFamily: headingFontName,
          fontSize: '$lg',
          lineHeight: '2.25rem',
        },
      }}
    >
      {children}
    </Container>
  );
};

export default FontContainer;
