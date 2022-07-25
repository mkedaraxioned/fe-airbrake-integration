import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';

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
      p='11px 40px 11px 20px'
      m='10px 0'
      pos='relative'
      rounded='md'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg='bgPrimary'
      fontSize='14px'
      lineHeight='17.6px'
      onMouseOver={over}
      onMouseOut={out}
    >
      <Box textStyle='sourceSansProRegular'>
        <Text color='textColor'>Milestone / Activity / Task</Text>
        <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
          Notes / Comments
        </Text>
      </Box>
      <Text color='textLightMid' textStyle='sourceSansProBold'>
        1:00
      </Text>
      <Box
        pos='absolute'
        top='35%'
        right='15px'
        display={isVisible ? 'block' : 'none'}
        cursor='pointer'
        color='grayLight'
      >
        <DeleteSvg />
      </Box>
    </Box>
  );
};

export default TimeCard;
