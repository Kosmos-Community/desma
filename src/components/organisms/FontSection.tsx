import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Row, Spacer, Text } from '@nextui-org/react';
import useDesignContext, { EDesignAction } from '../../context/DesignContext';
import Dropdown from '../atoms/Dropdown';
import { SCALE_OPTIONS, TABLE_HEADERS } from '../../utils/constants';
import Table from '../molecules/Table';
import { handleFontRatio } from '../../utils/scaleFactor';
import FontContainer from '../atoms/FontContainer';

const FontSection = () => {
  const { designData, setDesignState } = useDesignContext();
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [baseSize, setBaseSize] = useState(designData.font.baseSize);
  const [scaleFactor, setScaleFactor] = useState(designData.font.scaleFactor);
  const { headingFontName, paragraphFontName } = designData.font;

  useEffect(() => {
    const headingLink = `https://fonts.googleapis.com/css2?family=${headingFontName}:wght@400;700&display=swap`;
    const paragraphLink = `https://fonts.googleapis.com/css2?family=${paragraphFontName}:wght@400;700&display=swap`;
    const link = document.createElement('link');
    link.rel = 'stylesheet';

    link.href = headingLink;
    document.head.appendChild(link);

    link.href = paragraphLink;
    document.head.appendChild(link);
  }, [headingFontName, paragraphFontName]);

  useEffect(() => {
    setDesignState({
      type: EDesignAction.SET_FONTS,
      payload: {
        ...designData.font,
        baseSize,
        scaleFactor,
      },
    });
  }, [baseSize, scaleFactor, setDesignState]);

  const spacings = handleFontRatio(scaleFactor, baseSize, 'Lorem ipsum dolor sit amet');
  const TABLE_ROWS = [...spacings];

  const handleFonts = () => {
    setDesignState({
      type: EDesignAction.SET_FONTS,
      payload: {
        ...designData.font,
        headingFontName: heading,
        paragraphFontName: paragraph,
      },
    });
  };

  const handleBaseSize = (e) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    setBaseSize(value);
  };

  return (
    <>
      <Row>
        <Grid.Container direction="column" gap={2}>
          <Grid>
            <Row align="flex-end">
              <Input
                label="Heading Font"
                placeholder="Open Sans"
                bordered
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                helperText="Input a font from google fonts"
              />
              <Spacer />
              <Input
                label="Heading Font"
                placeholder="Open Sans"
                bordered
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                helperText="Input a font from google fonts"
              />
              <Spacer />
              <Button onClick={handleFonts} css={{ minWidth: 'auto' }}>
                Submit fonts
              </Button>
            </Row>
          </Grid>
          <Grid>
            <Spacer y={2} />
            <Text>Headings</Text>
            <FontContainer headingFontName={headingFontName} fontWeight="700">
              <Text>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</Text>
              <Spacer />
              <Text>1234567890!@£$%^&*()</Text>
            </FontContainer>
          </Grid>
          <Grid>
            <Text>Paragraphs</Text>
            <FontContainer headingFontName={paragraphFontName} fontWeight="400">
              <Text>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</Text>
              <Spacer />
              <Text>1234567890!@£$%^&*()</Text>
            </FontContainer>
          </Grid>
        </Grid.Container>
        <Grid.Container direction="column" gap={2}>
          <Grid>
            <Row>
              <Input
                label="Base size"
                placeholder="14"
                bordered
                type="number"
                value={`${baseSize}`}
                onChange={handleBaseSize}
              />
              <Spacer />
              <Dropdown
                label="Scale Factor"
                placeholder="Select Factor"
                options={SCALE_OPTIONS}
                value={scaleFactor}
                onChange={(e) => setScaleFactor(e.target.value)}
              />
            </Row>
          </Grid>
          <Grid>
            <Spacer y={2} />
            <Table
              tableHeaders={TABLE_HEADERS}
              tableRows={TABLE_ROWS}
              lastItemStyles={{ p: '0' }}
            />
          </Grid>
        </Grid.Container>
      </Row>
    </>
  );
};

export default FontSection;
