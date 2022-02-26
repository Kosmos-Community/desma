import React from 'react';
import { Grid } from '@nextui-org/react';
import { TableItem } from '../atoms/TableItem';

interface ITable {
  tableHeaders: string[];
  tableRows: any[];
}

const Table = ({ tableHeaders, tableRows }: ITable) => {
  return (
    <Grid.Container gap={0}>
      <Grid.Container gap={1} css={{ '*': { fontWeight: '$medium' } }}>
        {tableHeaders.map((header, i) => (
          <TableItem key={i}>{header}</TableItem>
        ))}
      </Grid.Container>
      <Grid.Container gap={2}>
        {tableRows.map((row) =>
          Object.keys(row).map((key, i) => {
            if (i === 3) {
              return (
                <TableItem key={i} cellSize={5}>
                  {row[key]}
                </TableItem>
              );
            } else {
              return <TableItem key={i}>{row[key]}</TableItem>;
            }
          })
        )}
      </Grid.Container>
    </Grid.Container>
  );
};

export default Table;
