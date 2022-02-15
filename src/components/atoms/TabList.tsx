import { cloneElement, Fragment } from 'react';
import { Container } from '@nextui-org/react';
import { ITabChild } from '../../interfaces/ITabs';

export const TabList = ({ children }: ITabChild) => {
  const panelArray = children instanceof Array ? children : [children];
  const panels = panelArray.filter((child) => child.type.name === 'Tab');

  return (
    <Container
      css={{
        width: '100%',
        padding: '.5rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 0,
        borderBottom: '2px solid $gray200',
      }}
    >
      {panels.map((panel, index) => (
        <Fragment key={index}>{cloneElement(panel, { index })}</Fragment>
      ))}
    </Container>
  );
};
