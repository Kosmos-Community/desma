import { Container } from '@nextui-org/react';

export const TabPanel = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};
