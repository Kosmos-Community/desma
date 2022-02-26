import { ITabChild } from '../../interfaces/ITabs';
import useTabsContext from '../../context/TabsContext';

export const TabPanels = ({ children }: ITabChild) => {
  const { tabState } = useTabsContext();

  const panelArray = children instanceof Array ? children : [children];
  const panels = panelArray.filter((child) => child.type.name === 'TabPanel');
  const [result] = panels.filter((child, index) => index === tabState);
  return result;
};
