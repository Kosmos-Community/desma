import { Button } from '@nextui-org/react';
import React, { ReactNode } from 'react';
import useTabsContext from '../../context/TabsProvider/TabsContext';

interface ITab {
  index?: number;
  children?: ReactNode;
}

export const Tab = ({ index, children, ...props }: ITab) => {
  const { tabState, setTabState } = useTabsContext();
  const color = index === tabState ? '#0070F3' : '#111111';

  const setTab = () => setTabState(index);

  return (
    <Button
      {...props}
      light
      size="sm"
      css={{ minWidth: '100px', color }}
      onClick={setTab}
    >
      {children}
    </Button>
  );
};
