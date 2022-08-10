import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { timecardsData } from '../../constants/entries';
import { Task, Timecards } from '../../interfaces/timeCard';
import { _get } from '../../utils/api';
import TimeCard from '../timeCard';

const TaskList = () => {
  const [timeCardDetails, setTimeCardDetails] = useState<Timecards>();
  const fetchEntries = async () => {
    const res = await _get(`/api/timecards`);
    setTimeCardDetails(res.data.timecardsData);
  };

  const projectDetails = timecardsData.timecardsData;

  useEffect(() => {
    // fetchEntries();
    projectDetails && setTimeCardDetails(projectDetails);
  }, []);

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
            pr='35px'
            fontSize='18px'
            lineHeight='22.63px'
            textStyle='sourceSansProBold'
          >
            {projectDetails.totalHours}
          </Heading>
        </HStack>
      </Box>
      {Array.isArray(projectDetails.projects) &&
        projectDetails.projects.map((project, i) => {
          return (
            <Box p={i === 0 ? '15px 0 10px' : undefined} key={project.name}>
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
                  {project.name}
                </Heading>
                <Text textStyle='sourceSansProBold'>{project.totalTime}</Text>
              </HStack>
              <Box>
                {Array.isArray(project?.tasks) &&
                  project?.tasks.map((task: Task) => (
                    <TimeCard key={task.taskId} task={task} />
                  ))}
              </Box>
            </Box>
          );
        })}
    </Box>
  );
};

export default TaskList;
