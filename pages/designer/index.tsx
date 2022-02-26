import React, { useReducer, useState } from 'react';
import { Input, Spacer, Text } from '@nextui-org/react';
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

const Home = () => {
  const [tabState, setTabState] = useState(0);
  const [state, dispatch] = useReducer(setDesignState, designData);

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
              <Text>test</Text>
            </TabPanel>
            <TabPanel>
              <SpacingSection />
            </TabPanel>
            <TabPanel>
              <Text>test</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </AppLayout>
    </DesignProvider>
  );
};

export default Home;
