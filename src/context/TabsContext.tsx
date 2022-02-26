import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface ITabs {
  tabState?: number;
  setTabState?: Dispatch<SetStateAction<number>>;
}

const TabsContext = createContext<ITabs>({});

export const Tabs = TabsContext.Provider;

const useTabsContext = () => {
  const { tabState, setTabState } = useContext(TabsContext);

  return { tabState, setTabState };
};

export default useTabsContext;
