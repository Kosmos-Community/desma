import React, { useEffect, useReducer, useState } from 'react';
import { Button, Input, Loading, Modal, Row, Spacer, Text } from '@nextui-org/react';
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
import { HiTrash } from 'react-icons/hi';

const Home = ({ user, palette, fonts, spacing, info, originalPalette }) => {
  const router = useRouter();
  const [tabState, setTabState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const handleDeleteDesign = async () => {
    setDeleteLoading(true);
    try {
      const designRes = await fetch(`${DESIGN_URL}/${info.data._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (designRes.ok) {
        router.push('/dashboard');
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <DesignProvider value={{ setDesignState: dispatch, designData: state }}>
      <AppLayout>
        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <Modal.Header>
            <Text h3 id="modal-title" size={18}>
              Delete Design System
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Row justify="center">
              {deleteLoading ? (
                <Loading color="error" size="sm" />
              ) : (
                <>
                  <Button css={{ minWidth: '150px', backgroundColor: '$accents4' }} onClick={() => setModalVisible(false)}>
                    Cancel
                  </Button>
                  <Spacer />
                  <Button
                    color="error"
                    css={{ minWidth: '150px' }}
                    onClick={handleDeleteDesign}
                  >
                    Delete Design
                  </Button>
                </>
              )}
            </Row>
          </Modal.Body>
        </Modal>
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
          <Row css={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Button
              onClick={handleDesignSave}
              disabled={loading}
              css={{ minWidth: 'fit-content' }}
            >
              {loading ? <Loading color="white" size="sm" /> : 'Update Design'}
            </Button>
            <Spacer />
            <Button
              color="error"
              onClick={() => setModalVisible(true)}
              disabled={loading}
              css={{ minWidth: 'fit-content' }}
            >
              <HiTrash />
            </Button>
          </Row>
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
