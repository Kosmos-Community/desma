import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface ITabs {
  tabState?: number;
  setTabState?: Dispatch<SetStateAction<number>>;
}

export const TabsContext = createContext<ITabs>({});

export const useTabsContext = () => {
  const { tabState, setTabState } = useContext(TabsContext);

  return { tabState, setTabState };
};
