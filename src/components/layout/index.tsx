import { Box } from '@chakra-ui/react';
import React from 'react';
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return <Box>{children}</Box>;
};

export default Layout;
