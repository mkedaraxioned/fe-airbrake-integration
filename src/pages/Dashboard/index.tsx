import {
  Avatar,
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Calendar from '../../components/calender';
import TaskList from '../../components/taskList';
import TimeLogFrom from '../../components/timeLogForm';

const Dashboard = () => {
  const [recentProject, setRecentProject] = useState('');

  const showDetailsHandle = (dayStr: string) => {
    console.log(dayStr);
  };
  return (
    <Box>
      <Flex justifyContent='center'>
        <Box flexBasis='31%' bg='bgLight'>
          <Box w='323px' mt='40px' mr='50px' ml='auto'>
            <Calendar showDetailsHandle={showDetailsHandle} />
          </Box>
        </Box>
        <Box
          p='40px 55px 0'
          borderLeft='1px'
          borderRight='1px'
          borderColor='borderColor'
          flexBasis='36%'
          bg='white'
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
            <TimeLogFrom recentProject={recentProject} />
          </Box>
          <Box mt='30px'>
            <TaskList />
          </Box>
        </Box>
        <Box p='40px 0 0 47px' flexBasis='33%'>
          <Heading
            as='h2'
            fontSize='22px'
            textStyle='sourceSansProRegular'
            lineHeight='27.65px'
            color='textLightMid'
          >
            Recently Used
          </Heading>
          <UnorderedList w='40%' listStyleType='none' m='0'>
            {Array.from({ length: 1 }).map((_, index) => {
              return (
                <ListItem
                  p='12px 0'
                  borderBottom='1px'
                  borderColor='borderPrimary'
                  fontSize='16px'
                  textStyle='sourceSansProRegular'
                  lineHeight='24px'
                  display='flex'
                  alignItems='center'
                  key={index}
                  cursor='pointer'
                  onClick={() => setRecentProject('WordPress Maintenance')}
                >
                  <Box mr='18px'>
                    <Avatar w='30px' h='30px' />
                  </Box>
                  <Box>
                    <Text
                      fontSize='14px'
                      lineHeight='17.6px'
                      color='textLightMid'
                    >
                      WordPress Maintenance
                    </Text>
                    <Text
                      fontSize='12px'
                      lineHeight='15.08px'
                      color='textLight'
                    >
                      Month 65
                    </Text>
                  </Box>
                </ListItem>
              );
            })}
            <ListItem
              p='12px 0'
              borderBottom='1px'
              borderColor='borderPrimary'
              fontSize='16px'
              textStyle='sourceSansProRegular'
              lineHeight='24px'
              display='flex'
              alignItems='center'
              cursor='pointer'
              onClick={() =>
                setRecentProject('ClearForMe Ongoing Retainer Agreement')
              }
            >
              <Box mr='18px'>
                <Avatar w='30px' h='30px' />
              </Box>
              <Box>
                <Text fontSize='14px' lineHeight='17.6px' color='textLightMid'>
                  ClearForMe Ongoing Retainer Agreement
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
