import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const TimeLogFrom = () => {
  return (
    <Box>
      <form>
        <FormControl m='12px 0 15px'>
          <FormLabel htmlFor='select_project' color='textLightMid' fontSize='14px' lineHeight='17.6px' fontWeight='bold'>Select Project</FormLabel>
          <Select id='select_project' placeholder='Select' fontSize='14px' lineHeight='17.6px' color='textLightMid'>
            <option>ClearForMe Ongoing Retainer Agreement</option>
            <option>Project 2</option>
          </Select>
        </FormControl>
        <FormControl m='14px 0'>
          <FormLabel htmlFor='retainer_month' color='textLightMid' fontSize='14px' lineHeight='17.6px' fontWeight='bold'>Retainer month</FormLabel>
          <Select id='retainer_month' placeholder='Select' fontSize='14px' lineHeight='17.6px' color='textLightMid'>
            <option>Task 1</option>
            <option>Task 2</option>
          </Select>
        </FormControl>
        <HStack justifyContent='space-between' m='14px 0'>
          <FormControl w='143px' mr='10px'>
            <FormLabel htmlFor='add_time' color='textLightMid' fontSize='14px' lineHeight='17.6px' fontWeight='bold'>Add Time</FormLabel>
            <Flex alignItems='center' border='1px' borderColor='borderColor' rounded='md'>
              <Input w='50%' id='add_time' boxSizing='border-box' type='text' value={''} border='none' placeholder='88:88' fontSize='14px' lineHeight='17.6px'/>
              <Text w='50%' textAlign='center' p='8px 0' bg='gray.300' fontSize='14px' lineHeight='24px' color='textLightMid'>Hours</Text>
            </Flex>
          </FormControl>
          <FormControl w='70%'>
            <FormLabel htmlFor='select_task' color='textLightMid' fontSize='14px' lineHeight='17.6px' fontWeight='bold'>Comments</FormLabel>
            <Input id='email' type='email' value={''}  placeholder='Please describe the activity' fontSize='14px' lineHeight='17.6px'/>
          </FormControl>
        </HStack>
        <Box>
          <Button w='137px' type='submit' variant='primary' mr='22px'>Add Entry</Button>
          <Button w='105px' variant='secondary'>Cancel</Button>
        </Box>
      </form>
    </Box>
  );
};

export default TimeLogFrom;
