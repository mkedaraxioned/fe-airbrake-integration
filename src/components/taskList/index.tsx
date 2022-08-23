import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { updateTimeCardDetails } from '../../feature/timeCardSlice';
import { Task } from '../../interfaces/timeCard';
import { RootState } from '../../store';
import { _get } from '../../utils/api';
import { formateDate } from '../../utils/common';
import TimeCard from '../timeCard';

const TaskList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentSelectedDate, timeCardDetails } = useSelector(
    (state: RootState) => state.timeCard,
  );

  const fetchEntries = async (date: string) => {
    try {
      navigate('/'); // remove for not updating query param when another date is selected
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData)
        return dispatch(updateTimeCardDetails(res?.data.timecardsData));

      dispatch(updateTimeCardDetails(null));
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
    <Box>
      <Box backgroundColor='bgLog' p='16px' mb='12px' borderRadius='5px'>
        <HStack justifyContent='space-between' color='textLogH'>
          <Heading
            as='h3'
            fontSize='16px'
            lineHeight='20.11px'
            textStyle='sourceSansProBold'
          >
            Total Logged Hours
          </Heading>
          <Heading
            as='h3'
            fontSize='16px'
            lineHeight='20.11px'
            textStyle='sourceSansProBold'
          >
            {timeCardDetails ? timeCardDetails?.totalHours : '00:00'} Hrs
          </Heading>
        </HStack>
      </Box>
      {Array.isArray(timeCardDetails?.projects)
        ? timeCardDetails?.projects.map((project, i) => {
            return (
              <Box p={i === 0 ? '15px 0 10px' : undefined} key={project.name}>
                <HStack
                  p='0 16px 0 0'
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
                  <Text textStyle='sourceSansProBold'>
                    {project.totalTime} Hrs
                  </Text>
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
