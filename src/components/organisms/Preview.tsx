import { Container, Card, Spacer, Text, Button } from '@nextui-org/react';
import useDesignContext from '../../context/DesignContext';
import { SCALES } from '../../utils/scaleFactor';

const Preview = () => {
  const { designData } = useDesignContext();

  return (
    <Container>
      <Spacer y={2} />
      <Card
        css={{
          backgroundColor: designData.palette.backgroundColors[0]
            ? designData.palette.backgroundColors[0].hexCode
            : '$primary',
          padding: '1rem 0 2rem 0',
        }}
      >
        <Container as="nav" css={{ marginBottom: `${designData.spacing.baseSize * SCALES[designData.spacing.scaleFactor] }rem` }}> 
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 24,
                color: designData.palette.textColor[0]
                  ? designData.palette.textColor[0].hexCode
                  : 'white',
              }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                clipRule="evenodd"
              />
            </svg>
            <Text
              h1
              size={24}
              color="white"
              css={{
                color: designData.palette.textColor[0]
                  ? designData.palette.textColor[0].hexCode
                  : 'white',
              }}
            >
              {designData.name ? designData.name : 'Palette'}
            </Text>
          </div>
        </Container>
        <Container className='Container'
          css={{
            marginBottom: `${designData.spacing.baseSize * SCALES[designData.spacing.scaleFactor]}rem`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Container
            css={{
              width: '30px',
              height: '20px',
              margin: `${designData.spacing.baseSize * SCALES[designData.spacing.scaleFactor]}rem`,
              borderRadius: '40px',
              backgroundColor: designData.palette.extraColors[0]
                ? designData.palette.extraColors[0].hexCode
                : '#ffd230',
            }}
          ></Container>
          <Text
            h2
            size={36}
            color="white"
            css={{
              fontSize: `${
                designData.font.baseSize * SCALES[designData.font.scaleFactor] * 1.6
              }px`,
              fontFamily: designData.font.headingFontName,
              textAlign: 'center',
              marginBottom: `${designData.spacing.baseSize * SCALES[designData.spacing.scaleFactor]}rem`,
              color: designData.palette.textColor[0]
                ? designData.palette.textColor[0].hexCode
                : 'white',
            }}
          >
            An Amazing Heading Title
          </Text>
          <Text
            h5
            color="white"
            css={{
              fontSize: `${designData.font.baseSize}px`,
              fontFamily: designData.font.parragraphFontName,
              textAlign: 'center',
              marginBottom: `${designData.spacing.baseSize * SCALES[designData.spacing.scaleFactor]}rem`,
              color: designData.palette.textColor[0]
                ? designData.palette.textColor[0].hexCode
                : 'white',
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, perferendis
            ratione explicabo.
          </Text>
          <Button
            auto
            css={{
              width: '150px',
              backgroundColor: designData.palette.primaryColor[0]
                ? designData.palette.primaryColor[0].hexCode
                : 'white',
            }}
          ></Button>
        </Container>
        <Container
          css={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[0, 1, 2, 4, 5].map((val) => (
            <Card
              key={val}
              css={{
                width: '300px',
                height: '150px',
                backgroundColor: designData.palette.backgroundColors[1]
                  ? designData.palette.backgroundColors[1].hexCode
                  : 'white',
              }}
            ></Card>
          ))}
        </Container>
      </Card>
      <Spacer y={2} />
    </Container>
  );
};

export default Preview;
