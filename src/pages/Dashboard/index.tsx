import {
  Avatar,
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import AutoCompleteElem from '../../components/autoComplete';
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
        <Box pt='40px' flexBasis='23%' mr='50px'>
          <Calendar showDetailsHandle={showDetailsHandle} />
        </Box>
        <Box
          p='40px 55px 0'
          borderLeft='1px'
          borderRight='1px'
          borderColor='borderColor'
          flexBasis='47%'
        >
          <Box>
            <Heading
              as='h3'
              fontSize='22px'
              lineHeight='27.65px'
              color='textColor'
              textStyle='sourceSansProBold'
            >
              Add a new entry
            </Heading>
            <TimeLogFrom />
          </Box>
          <Box mt='30px'>
            <TaskList />
          </Box>
        </Box>
        <Box p='40px 0 0 47px'>
          <Heading
            as='h2'
            fontSize='22px'
            textStyle='sourceSansProRegular'
            lineHeight='27.65px'
            color='textLightMid'
          >
            Recently Used
          </Heading>
          <UnorderedList listStyleType='none' m='0'>
            <ListItem
              p='12px 0'
              borderBottom='1px'
              borderColor='borderPrimary'
              fontSize='16px'
              textStyle='sourceSansProRegular'
              lineHeight='24px'
              display='flex'
              alignItems='center'
            >
              <Box mr='18px'>
                <Avatar w='30px' h='30px' />
              </Box>
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  WordPress Maintenance
                </Text>
                <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
                  Month 65
                </Text>
              </Box>
            </ListItem>
            <ListItem
              p='12px 0'
              borderBottom='1px'
              borderColor='borderPrimary'
              fontSize='16px'
              lineHeight='24px'
              display='flex'
              alignItems='center'
            >
              <Box mr='18px'>
                <Avatar w='30px' h='30px' />
              </Box>
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  WordPress Maintenance
                </Text>
                <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
                  Month 65
                </Text>
              </Box>
            </ListItem>
            <ListItem
              p='12px 0'
              borderBottom='1px'
              borderColor='borderPrimary'
              fontSize='16px'
              lineHeight='24px'
              display='flex'
              alignItems='center'
            >
              <Box mr='18px'>
                <Avatar w='30px' h='30px' />
              </Box>
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  WordPress Maintenance
                </Text>
                <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
                  Month 65
                </Text>
              </Box>
            </ListItem>
            <ListItem
              p='12px 0'
              fontSize='16px'
              lineHeight='24px'
              display='flex'
              alignItems='center'
            >
              <Box mr='18px'>
                <Avatar w='30px' h='30px' />
              </Box>
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  WordPress Maintenance
                </Text>
                <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
                  Month 65
                </Text>
              </Box>
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
};

export default Dashboard;
