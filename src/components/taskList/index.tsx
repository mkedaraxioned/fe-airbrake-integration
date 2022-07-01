import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import TimeCard from '../timeCard';

const TaskList = () => {
  return (
    <Box p='17px 0'>
      <Box>
        <HStack justifyContent='space-between' color='textColor'>
          <Heading
            as='h3'
            fontSize='22px'
            lineHeight='27.65px'
            textStyle='sourceSansProBold'
          >
            Entries logged
          </Heading>
          <Heading
            as='h3'
            fontSize='18px'
            lineHeight='22.63px'
            textStyle='sourceSansProBold'
          >
            7:30 hours
          </Heading>
        </HStack>
      </Box>
      <Box p='15px 0 10px'>
        <HStack
          p='0 33px 5px 0'
          justifyContent='space-between'
          color='textLightMid'
        >
          <Heading
            as='h4'
            fontSize='18px'
            lineHeight='22.63px'
            textStyle='sourceSansProBold'
          >
            ClearForMe Ongoing Retainer
          </Heading>
          <Text textStyle='sourceSansProBold'>4:00 hours</Text>
        </HStack>
        <Box>
          <TimeCard />
          <TimeCard />
        </Box>
      </Box>
      <Box>
        <HStack
          p='0 33px 5px 0'
          justifyContent='space-between'
          color='textLightMid'
        >
          <Heading
            as='h4'
            fontSize='18px'
            lineHeight='22.63px'
            textStyle='sourceSansProBold'
          >
            ClearForMe Ongoing Retainer
          </Heading>
          <Text textStyle='sourceSansProBold'>4:00 hours</Text>
        </HStack>
        <Box>
          <TimeCard />
          <TimeCard />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskList;
