import { useState } from 'react';
import { ITabChild } from '../../interfaces/ITabs';
import { TabsContext } from '../../providers/TabsProvider/TabsContext';

export const Tabs = ({ children }: ITabChild) => {
  const [tabState, setTabState] = useState(0);

  return (
    <TabsContext.Provider value={{ tabState, setTabState }}>
      {children}
    </TabsContext.Provider>
  );
};
