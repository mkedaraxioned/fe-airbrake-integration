import { Box, Heading, HStack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setTimeCardDetails } from '../../feature/timeCardSlice';
import { Task } from '../../interfaces/timeCard';
import { RootState } from '../../store';
import { _get } from '../../utils/api';
import { formateDate } from '../../utils/common';
import TimeCard from '../timeCard';

const TaskList = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentSelectedDate, timeCardDetails } = useSelector(
    (state: RootState) => state.timeCard,
  );

  const fetchEntries = async (date: string) => {
    try {
      navigate('/');
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData)
        return dispatch(setTimeCardDetails(res?.data.timecardsData));

      dispatch(setTimeCardDetails(null));
      toast({
        title: 'Entry Logs Detail',
        description: 'Nothing logged for selected date',
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currentSelectedDate) {
      fetchEntries(formateDate(currentSelectedDate));
    }
  }, [currentSelectedDate]);

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
            {timeCardDetails ? timeCardDetails?.totalHours : '00:00'}
          </Heading>
        </HStack>
      </Box>
      {Array.isArray(timeCardDetails?.projects)
        ? timeCardDetails?.projects.map((project, i) => {
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
                  {Array.isArray(project?.tasks)
                    ? project?.tasks.map((task: Task) => (
                        <TimeCard key={task.taskId} task={task} />
                      ))
                    : null}
                </Box>
              </Box>
            );
          })
        : null}
    </Box>
  );
};

export default TaskList;
