import {
  Box,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import TimeCard from '../timeCard';

const TaskList = () => {
  return (
    <Box p='17px 0'>
      <Box>
        <HStack justifyContent='space-between' color='textColor'>
          <Heading as='h3' fontSize='22px' lineHeight='27.65px'>
          Entries logged
          </Heading>
          <Heading as='h3' fontSize='18px' lineHeight='22.63px'>
          7:30 hours
          </Heading>
        </HStack>
      </Box>
      <Box p='15px 0 10px'>
        <HStack pb='5px' justifyContent='space-between' color='textLightMid' pr='19px'>
          <Heading as='h4' fontSize='18px' lineHeight='22.63px' >ClearForMe Ongoing Retainer</Heading>
          <Text>4:00 hours</Text>
        </HStack>
        <Box>
          <TimeCard/>
          <TimeCard/>
        </Box>
      </Box>
      <Box>
        <HStack pb='5px' justifyContent='space-between' color='textLightMid' pr='19px'>
          <Heading as='h4' fontSize='18px' lineHeight='22.63px' >ClearForMe Ongoing Retainer</Heading>
          <Text>4:00 hours</Text>
        </HStack>
        <Box>
          <TimeCard/>
          <TimeCard/>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskList;
