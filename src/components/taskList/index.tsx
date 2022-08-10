import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TimeCard from '../timeCard';

const TaskList = () => {
  const projects = useSelector(
    (state: RootState) => state.entryDetails.entries.projects,
  );
  const totalHours = useSelector(
    (state: RootState) => state.entryDetails.entries.totalHours,
  );

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
            {totalHours}
          </Heading>
        </HStack>
      </Box>
      {Array.isArray(projects) &&
        projects.map((project, i) => {
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
                  project?.tasks.map((task) => (
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
