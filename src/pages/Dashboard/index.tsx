import { Box, Flex, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Calendar from '../../components/calender';
import TaskList from '../../components/taskList';
import TimeLogFrom from '../../components/timeLogForm';

const Dashboard = () => {
  const showDetailsHandle = (dayStr: string) => {
    console.log(dayStr);
  };
  return (
    <Box className='wrapper'>
      <Flex>
        <Box mr='50px'>
          <Calendar showDetailsHandle={showDetailsHandle} />
          <Box p='20px 30px'>
            <Heading as='h2' fontSize='22px' lineHeight='32px' color='primary'>
              Recently Used
            </Heading>
            <UnorderedList listStyleType='none' m='0' color='primary'>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># Teenlife website maintenance (Sprint 2 - #ICJ..)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># TEG - WordPress maintenance (Month 46)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># Pandamic Action Network (Months 65)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># Shutterstock (Months 65)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># Teenlife website maintenance (Sprint 2 - #ICJ..)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># TEG - WordPress maintenance (Month 46)</ListItem>
              <ListItem fontSize='16px' lineHeight='24px' m='14px 0'># Pandamic Action Network (Months 65)</ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Box w='529px'>
          <Box p='16px 20px' mt='30px' bg='white' color='primary'>
            <Heading as='h3'fontSize='22px' lineHeight='33px'>Project 1</Heading>
            <TimeLogFrom/>
          </Box>
          <Box mt='30px'>
            <TaskList/>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
