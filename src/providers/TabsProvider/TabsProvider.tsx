import { useState } from 'react';
import { TabsContext } from './TabsContext';

export const Tabs = ({ children }) => {
  const [tabState, setTabState] = useState(0);

  return (
    <TabsContext.Provider value={{ tabState, setTabState }}>
      {children}
    </TabsContext.Provider>
  );
};
