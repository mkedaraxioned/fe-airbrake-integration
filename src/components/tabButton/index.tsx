import { Box, Tab } from '@chakra-ui/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const TabsButton = ({ children }: Props) => {
  return (
    <Box>
      <Tab
        w='200px'
        h='58px'
        color='grayLight'
        fontSize='18px'
        textStyle='sourceSansProRegular'
        lineHeight='22.63px'
        bg='tabBg'
        _selected={{
          bg: 'white',
          borderBottom: '4px',
          borderColor: 'btnPurple',
          textStyle: 'sourceSansProBold',
        }}
        _focus={{ border: 'none' }}
      >
        {children}
      </Tab>
    </Box>
  );
};

export default TabsButton;
