import { Grid } from '@nextui-org/react';
import { ReactNode } from 'react';

interface ITableItem {
  cellSize?: number;
  children: ReactNode;
  css?: any;
}

export const TableItem = ({ cellSize = 2, children, ...props }: ITableItem) => {
  return <Grid as="section" xs={cellSize} {...props}>{children}</Grid>;
};
