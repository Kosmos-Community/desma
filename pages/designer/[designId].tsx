import React, { useEffect, useReducer, useState } from 'react';
import { Input, Spacer } from '@nextui-org/react';
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
  setDesignState,
} from '../../src/context/DesignContext';
import FontSection from '../../src/components/organisms/FontSection';
import Preview from '../../src/components/organisms/Preview';
import { withIronSessionSsr } from 'iron-session/next';
import { serverSidePropsProtected } from '../../lib/authServerSide';
import { ironOptions } from '../../lib/config';
import useUserContext from '../../src/context/UserContext';

const Home = ({ user }) => {
  const [tabState, setTabState] = useState(0);
  const [state, dispatch] = useReducer(setDesignState, designData);
  const { setUserData } = useUserContext();

  useEffect(() => {
    if (!user) return;
    setUserData(user);
  }, [user, setUserData]);

  return (
    <DesignProvider value={{ setDesignState: dispatch, designData: state }}>
      <AppLayout>
        <Input size="xl" bordered shadow={false} placeholder="Untitled Design System" />
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
  serverSidePropsProtected,
  ironOptions
);

export default Home;
