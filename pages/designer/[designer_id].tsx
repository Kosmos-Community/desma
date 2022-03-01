import React, { useEffect, useReducer, useState } from 'react';
import { Button, Input, Loading, Row, Spacer, Text } from '@nextui-org/react';
import { Tab } from '../../src/components/atoms/Tab';
import { TabList } from '../../src/components/atoms/TabList';
import { TabPanel } from '../../src/components/atoms/TabPanel';
import { TabPanels } from '../../src/components/atoms/TabPanels';
import AppLayout from '../../src/components/templates/AppLayout';
import ColorSection from '../../src/components/organisms/ColorSection';
import SpacingSection from '../../src/components/organisms/SpacingSection';
import { Tabs } from '../../src/context/TabsContext';
import {
  designData,
  DesignProvider,
  EDesignAction,
  setDesignState,
} from '../../src/context/DesignContext';
import FontSection from '../../src/components/organisms/FontSection';
import Preview from '../../src/components/organisms/Preview';
import { withIronSessionSsr } from 'iron-session/next';
import { serverSidePropsDesigner } from '../../lib/authServerSide';
import { ironOptions } from '../../lib/config';
import useUserContext from '../../src/context/UserContext';
import {
  DESIGN_URL,
  FONT_URL,
  PALETTE_URL,
  SPACING_URL,
} from '../../src/utils/constants';
import { useRouter } from 'next/router';

const Home = ({ user, palette, fonts, spacing, info, originalPalette }) => {
  const router = useRouter();
  const [tabState, setTabState] = useState(0);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(setDesignState, designData);
  const { setUserData } = useUserContext();

  useEffect(() => {
    dispatch({
      type: EDesignAction.SET_NAME,
      payload: info.data.name,
    });

    dispatch({
      type: EDesignAction.SET_PALETTE,
      payload: { ...palette },
    });

    dispatch({
      type: EDesignAction.SET_FONTS,
      payload: fonts.data,
    });

    dispatch({
      type: EDesignAction.SET_SPACING,
      payload: spacing.data,
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    setUserData(user);
  }, [user, setUserData]);

  const handleDesignSave = async () => {
    setLoading(true);
    try {
      const paletteWithoutIds = { ...state.palette };

      const primaryColors = originalPalette.primaryColor.map((color) => color._id);
      const secondaryColors = originalPalette.secondaryColor.map((color) => color._id);
      const textColor = originalPalette.textColor.map((color) => color._id);
      const backgroundColors = originalPalette.backgroundColors.map((color) => color._id);
      const extraColors = originalPalette.extraColors.map((color) => color._id);

      paletteWithoutIds.primaryColor = paletteWithoutIds.primaryColor.map((color) => {
        if (primaryColors.includes(color._id)) {
          return color;
        } else {
          return { hexCode: color.hexCode };
        }
      });

      paletteWithoutIds.secondaryColor = paletteWithoutIds.secondaryColor.map((color) => {
        if (secondaryColors.includes(color._id)) {
          return color;
        } else {
          return { hexCode: color.hexCode };
        }
      });

      paletteWithoutIds.textColor = paletteWithoutIds.textColor.map((color) => {
        if (textColor.includes(color._id)) {
          return color;
        } else {
          return { hexCode: color.hexCode };
        }
      });

      paletteWithoutIds.backgroundColors = paletteWithoutIds.backgroundColors.map(
        (color) => {
          if (backgroundColors.includes(color._id)) {
            return color;
          } else {
            return { hexCode: color.hexCode };
          }
        }
      );

      paletteWithoutIds.extraColors = paletteWithoutIds.extraColors.map((color) => {
        if (extraColors.includes(color._id)) {
          return color;
        } else {
          return { hexCode: color.hexCode };
        }
      });

      const paletteRes = await fetch(`${PALETTE_URL}/${info.data.paletteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(paletteWithoutIds),
      });

      const fontRes = await fetch(`${FONT_URL}/${info.data.fontsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(state.font),
      });

      const spacingRes = await fetch(`${SPACING_URL}/${info.data.spacingsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(state.spacing),
      });

      const designRes = await fetch(`${DESIGN_URL}/${info.data._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          name: state.name,
          isPublic: true,
        }),
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DesignProvider value={{ setDesignState: dispatch, designData: state }}>
      <AppLayout>
        <Row align="center" justify="space-between">
          <Input
            size="xl"
            bordered
            shadow={false}
            placeholder="Untitled Design System"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: EDesignAction.SET_NAME, payload: e.target.value })
            }
          />
          <Button onClick={handleDesignSave} disabled={loading}>
            {loading ? <Loading color="white" size="sm" /> : 'Update Design'}
          </Button>
        </Row>
        <Spacer y={1} />
        <Tabs value={{ tabState, setTabState }}>
          <TabList>
            <Tab>Colors</Tab>
            <Tab>Fonts</Tab>
            <Tab>Spacing</Tab>
            <Tab>Preview</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ColorSection />
            </TabPanel>
            <TabPanel>
              <FontSection />
            </TabPanel>
            <TabPanel>
              <SpacingSection />
            </TabPanel>
            <TabPanel>
              <Preview />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AppLayout>
    </DesignProvider>
  );
};

export const getServerSideProps = withIronSessionSsr(
  serverSidePropsDesigner,
  ironOptions
);

export default Home;
