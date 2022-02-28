import { ITabChild } from '../../interfaces/ITabs';
import useTabsContext from '../../context/TabsContext';

export const TabPanels = ({ children }: ITabChild) => {
  const { tabState } = useTabsContext();

  const panelArray = children instanceof Array ? children : [children];
  if (panelArray.length <= 0) return <></>;
  const result = panelArray.find((child, index) => index === tabState);
  if (!result) return <></>;
  return result;
};
