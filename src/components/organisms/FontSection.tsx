import React, { useEffect, useState } from 'react';
import { Button, Grid, Input, Row, Spacer, Text } from '@nextui-org/react';
import useDesignContext, { EDesignAction } from '../../context/DesignContext';
import Dropdown from '../atoms/Dropdown';
import {
  GOOGLE_FONTS_URL,
  SCALE_OPTIONS,
  TABLE_HEADERS,
  WEIGHT_QUERY,
} from '../../utils/constants';
import Table from '../molecules/Table';
import { handleFontRatio } from '../../utils/scaleFactor';
import FontContainer from '../atoms/FontContainer';

const FontSection = () => {
  const { designData, setDesignState } = useDesignContext();
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [baseSize, setBaseSize] = useState(designData.font.baseSize);
  const [scaleFactor, setScaleFactor] = useState(designData.font.scaleFactor);
  const { headingFontName, parragraphFontName } = designData.font;

  useEffect(() => {
    const newHeading = headingFontName.replace(/\s/g, '+');
    const newParagraph = parragraphFontName.replace(/\s/g, '+');
    const headingLink = `${GOOGLE_FONTS_URL}${newHeading}${WEIGHT_QUERY}`;
    const paragraphLink = `${GOOGLE_FONTS_URL}${newParagraph}${WEIGHT_QUERY}`;
    const link = document.createElement('link');

    const links = document.getElementsByTagName('link');

    let headingLinkExists = false;
    let paragraphLinkExists = false;
    for (let item of Array.from(links)) {
      if (item.href === headingLink) headingLinkExists = true;
    }
    link.rel = 'stylesheet';

    if (!headingLinkExists) {
      link.href = headingLink;
      document.head.appendChild(link);
    }

    if (!paragraphLinkExists) {
      link.href = paragraphLink;
      document.head.appendChild(link);
    }
  }, [headingFontName, parragraphFontName]);

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
        parragraphFontName: paragraph,
      },
    });
  };

  const handleBaseSize = (e) => {
    const value = Number(e.target.value);
    if (value < 1) return;
    setBaseSize(value);
  };

  return (
    <Row wrap="wrap" justify="space-between">
      <Grid.Container direction="column" gap={2} css={{ maxWidth: 'fit-content' }}>
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
              label="Paragraph Font"
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
          <FontContainer headingFontName={parragraphFontName} fontWeight="400">
            <Text>AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz</Text>
            <Spacer />
            <Text>1234567890!@£$%^&*()</Text>
          </FontContainer>
        </Grid>
      </Grid.Container>
      <Grid.Container direction="column" gap={2} css={{ maxWidth: '650px' }}>
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
  );
};

export default FontSection;
