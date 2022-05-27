import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
} from '@chakra-ui/react';
import React from 'react';

const TimeLogFrom = () => {
  return (
    <Box color='primary'>
      <form>
        <FormControl m='12px 0 22px'>
          <FormLabel htmlFor='select_project' fontSize='12px' lineHeight='18px'>Select Project</FormLabel>
          <Select id='select_project' placeholder='Select' fontSize='12.46px' lineHeight='18.69px'>
            <option>Project 1</option>
            <option>Project 2</option>
          </Select>
        </FormControl>
        <FormControl m='22px 0'>
          <FormLabel htmlFor='select_task' fontSize='12px' lineHeight='18px'>Select Task</FormLabel>
          <Select id='select_task' placeholder='Select' fontSize='12.46px' lineHeight='18.69px'>
            <option>Task 1</option>
            <option>Task 2</option>
          </Select>
        </FormControl>
        <HStack justifyContent='space-between' m='22px 0'>
          <FormControl w='94.5px' mr='10px'>
            <FormLabel htmlFor='add_time' fontSize='12px' lineHeight='18px'>Add Time</FormLabel>
            <Input id='add_time' type='text' value={''} placeholder='1:30' fontSize='12.46px' lineHeight='18.69px'/>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='select_task' fontSize='12px' lineHeight='18px'>Add Note</FormLabel>
            <Input id='email' type='email' value={''}  placeholder='Please add your noter here' fontSize='12.46px' lineHeight='18.69px'/>
          </FormControl>
        </HStack>
        <Box>
          <Button w='full' variant='primary'>Save</Button>
        </Box>
      </form>
    </Box>
  );
};

export default TimeLogFrom;
