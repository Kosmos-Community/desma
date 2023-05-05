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

import axios from 'axios';

const FontSection = () => {
  const { designData, setDesignState } = useDesignContext();
  const [heading, setHeading] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [baseSize, setBaseSize] = useState(designData.font.baseSize);
  const [scaleFactor, setScaleFactor] = useState(designData.font.scaleFactor);
  const { headingFontName, parragraphFontName } = designData.font;

  const [errorMsg, setErrorMsg] = useState('');

  function toTitleCase(str) {
      return str.toLowerCase().replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    }

  useEffect(() => {
    setHeading(toTitleCase(headingFontName));
    setParagraph(toTitleCase(parragraphFontName));
  }, []);

  useEffect(() => {
    const newHeading = toTitleCase(headingFontName).replace(/\s/g, '+');
    const newParagraph = toTitleCase(parragraphFontName).replace(/\s/g, '+');
    const headingLink = `${GOOGLE_FONTS_URL}${newHeading}${WEIGHT_QUERY}`;
    const paragraphLink = `${GOOGLE_FONTS_URL}${newParagraph}${WEIGHT_QUERY}`;

    const fetchFont = async (url, type) => {
      let response;
      try {
        response = await axios.get(url);
        return response.status === 200;
      } catch (error) {
        if (type === 1) setErrorMsg(`Font ${headingFontName} not found.`);
        if (type === 2) setErrorMsg(`Font ${parragraphFontName} not found.`);
        console.error(error);
        return;
      }
    };

    setErrorMsg('');

    const loadFont = async (url) => {
      try {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
        return true;
      } catch (error) {
        return;
      }
    };

    const loadFontsIfNeeded = async () => {
      const links = document.getElementsByTagName('link');
      let headingLinkExists = false;
      let paragraphLinkExists = false;
      for (let item of Array.from(links)) {
        if (item.href === headingLink) headingLinkExists = true;
        if (item.href === paragraphLink) paragraphLinkExists = true;
      }
      if (!headingLinkExists) {
        const loaded = await fetchFont(headingLink, 1);
        if (loaded) {
          await loadFont(headingLink);
        }
      }
      if (!paragraphLinkExists) {
        const loaded = await fetchFont(paragraphLink, 2);
        if (loaded) {
          await loadFont(paragraphLink);
        }
      }
    };

    loadFontsIfNeeded();
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

            <Spacer y={2} />
            <Text
              small
              weight="bold"
              color="white"
              hidden={errorMsg == ''}
              css={{
                width: '100%',
                padding: '.2rem',
                backgroundColor: '#EF4444',
                position: 'fixed',
                bottom: '0',
                left: '0',
                textAlign: 'center',
              }}
            >
              {errorMsg}
            </Text>
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
