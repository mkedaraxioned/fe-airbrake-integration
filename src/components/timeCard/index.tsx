import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const TimeCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const over = () => {
    setIsVisible(true);
  };

  const out = () => {
    setIsVisible(false);
  };
  return (
    <Box
      p='30px 20px'
      m='10px 0'
      pos='relative'
      rounded='md'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg='bgLight'
      fontSize='14px'
      lineHeight='17.6px'
      onMouseOver={over}
      onMouseOut={out}
    >
      <Box fontFamily='Source Sans Pro' fontWeight='400'>
        <Text color='textColor'>Milestone / Activity / Task</Text>
        <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
          Notes / Comments
        </Text>
      </Box>
      <Text color='textLightMid' fontWeight='600'>1:00 hours</Text>
      <Box pos='absolute' top='45%' right='-24px' display={isVisible?'block':'none'} cursor='pointer' color='grayLight'>
        <RiDeleteBin6Fill fontSize={'16px'} />
      </Box>
    </Box>
  );
};

export default TimeCard;
