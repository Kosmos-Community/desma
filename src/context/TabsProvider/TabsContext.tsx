import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface ITabs {
  tabState?: number;
  setTabState?: Dispatch<SetStateAction<number>>;
}

export const TabsContext = createContext<ITabs>({});

export const Tabs = ({ children }) => {
  const [tabState, setTabState] = useState(0);

  return (
    <TabsContext.Provider value={{ tabState, setTabState }}>
      {children}
    </TabsContext.Provider>
  );
};

const useTabsContext = () => {
  const { tabState, setTabState } = useContext(TabsContext);

  return { tabState, setTabState };
};

export default useTabsContext;
