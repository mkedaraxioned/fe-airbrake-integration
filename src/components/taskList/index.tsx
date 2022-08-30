import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeCardDetails } from '../../feature/timeCardSlice';
import { Task } from '../../interfaces/timeCard';
import { RootState } from '../../store';
import { _get } from '../../utils/api';
import TimeCard from '../timeCard';

interface Props {
  formData: any;
}

const TaskList = ({ formData }: Props) => {
  const dispatch = useDispatch();

  const { timeCardDetails } = useSelector((state: RootState) => state.timeCard);

  const fetchEntries = async (date: string) => {
    try {
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData)
        return dispatch(updateTimeCardDetails(res?.data.timecardsData));
      dispatch(updateTimeCardDetails(null));
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (formData.date) {
      fetchEntries(format(new Date(formData.date), 'yyyy-MM-dd'));
    }
  }, [formData.date]);

  return (
    <Box>
      <Box mb='7px'>
        <HStack width='95%' justifyContent='space-between' color='greyLight'>
          <Heading
            as='h3'
            fontSize='18px'
            lineHeight='20px'
            textStyle='sourceSansProBold'
          >
            Total Logged Hours
          </Heading>
          <Heading
            as='h3'
            fontSize='18px'
            lineHeight='20px'
            textStyle='sourceSansProBold'
          >
            {timeCardDetails ? timeCardDetails?.totalHours : '00:00'} Hrs
          </Heading>
        </HStack>
      </Box>
      {Array.isArray(timeCardDetails?.projects)
        ? timeCardDetails?.projects.map((project: any, i) => {
            return (
              <Box p={i === 0 ? '15px 0 10px' : undefined} key={project.name}>
                <HStack
                  justifyContent='space-between'
                  color='textLightMid'
                  width='95%'
                >
                  <Heading
                    as='h4'
                    fontSize='16px'
                    lineHeight='20.11px'
                    textStyle='sourceSansProRegular'
                  >
                    {`${project.client} - ${project.name}`}
                  </Heading>
                  <Text
                    fontSize='16px'
                    lineHeight='20.11px'
                    textStyle='sourceSansProRegular'
                  >
                    {project.totalTime} Hrs
                  </Text>
                </HStack>
                <Box>
                  {Array.isArray(project?.tasks)
                    ? project?.tasks.map((task: Task) => (
                        <TimeCard
                          key={task.taskId}
                          task={task}
                          formData={formData}
                        />
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
