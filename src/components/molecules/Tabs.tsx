import React, { cloneElement } from 'react';
import { Container, Text } from '@nextui-org/react';
import { useTabsContext } from '../../providers/TabsProvider/TabsContext';
import { Tabs } from '../../providers/TabsProvider/TabsProvider';
import { Tab } from '../atoms/Tab';
import { TabPanel } from '../atoms/TabPanel';

const TabPanels = ({ children }) => {
  const { tabState } = useTabsContext();
  const panels = children.filter((child) => child.type.name === 'TabPanel');
  return panels.filter((child, index) => index === tabState);
};

const TabList = ({ children }) => {
  const panels = children.filter((child) => child.type.name === 'Tab');

  return (
    <Container
      css={{
        width: '100%',
        padding: '.5rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        borderBottom: '2px solid $gray200',
      }}
    >
      {panels.map((panel, index) => {
        return cloneElement(panel, { index });
      })}
    </Container>
  );
};

const BaseTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Panel 1</Tab>
        <Tab>Panel 2</Tab>
        <Tab>Panel 3</Tab>
        <Tab>Panel 4</Tab>
      </TabList>
      <TabPanels>
        <Text>Not inside</Text>
        <TabPanel>
          <Text>Panel 1</Text>
        </TabPanel>
        <TabPanel>
          <Text>Panel 2</Text>
        </TabPanel>
        <TabPanel>
          <Text>Panel 3</Text>
        </TabPanel>
        <TabPanel>
          <Text>Panel 4</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default BaseTabs;
