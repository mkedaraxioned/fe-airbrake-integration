import { Box } from '@chakra-ui/react';
import React from 'react';
import Header from '../header';
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Header />
      <main>
        <Box pt='70px'>{children}</Box>
      </main>
    </Box>
  );
};

export default Layout;
