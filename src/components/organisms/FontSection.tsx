import React, { useEffect, useState } from 'react';
import { Text } from '@nextui-org/react';
import useDesignContext from '../../context/DesignContext';

const FontSection = () => {
  const { designData, setDesignState } = useDesignContext();
  const [font, setFont] = useState(designData.font.headingFontName);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${font}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }, [font]);

  const handleFonts = () => {
    setFont('BhuTuka Expanded One');
  };
  return (
    <div>
      {/* <FontLoader /> */}
      <button onClick={handleFonts}>testttt</button>
      <Text css={{ fontFamily: font }}>test</Text>
    </div>
  );
};

export default FontSection;
