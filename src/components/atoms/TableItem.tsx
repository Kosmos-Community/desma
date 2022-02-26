import { Grid } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ITableItem {
  cellSize?: number;
  children: ReactNode;
}

export const TableItem = ({ cellSize = 2, children }: ITableItem) => {
  return <Grid xs={cellSize}>{children}</Grid>;
};
