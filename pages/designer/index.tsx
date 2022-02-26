import React from 'react';
import { Input, Spacer, Text } from '@nextui-org/react';
import { Tab } from '../../src/components/atoms/Tab';
import { TabList } from '../../src/components/atoms/TabList';
import { TabPanel } from '../../src/components/atoms/TabPanel';
import { TabPanels } from '../../src/components/atoms/TabPanels';
import AppLayout from '../../src/components/templates/AppLayout';
import ColorSection from '../../src/components/organisms/ColorSection';
import SpacingSection from '../../src/components/organisms/SpacingSection';
import { Tabs } from '../../src/context/TabsContext';

const Home = () => {
  return (
    <AppLayout>
      <Input size="xl" bordered shadow={false} placeholder="Untitled Design System" />
      <Spacer y={1} />
      <Tabs>
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
  );
};

export default Home;
