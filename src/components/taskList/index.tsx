import { Box, Flex, Heading, HStack, Skeleton, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimeCardDetails } from '../../redux/reducers/timeCardSlice';
import { Project, Task } from '../../interfaces/timeCard';
import { RootState } from '../../redux';
import { _get } from '../../utils/api';
import TimeCard from '../timeCard';

interface Props {
  formData: any;
}

const TaskList = ({ formData }: Props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const { timeCardDetails } = useSelector(
    (state: RootState) => state.rootSlices.timeCard,
  );

  const fetchEntries = async (date: string) => {
    try {
      setLoading(true);
      dispatch(updateTimeCardDetails([]));
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData) {
        setLoading(false);
        return dispatch(updateTimeCardDetails(res?.data.timecardsData));
      }
      dispatch(updateTimeCardDetails([]));
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
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
          <Skeleton isLoaded={!loading}>
            <Heading
              as='h3'
              fontSize='18px'
              lineHeight='20px'
              textStyle='sourceSansProBold'
            >
              {timeCardDetails?.totalHours
                ? timeCardDetails?.totalHours
                : '00:00'}{' '}
              Hrs
            </Heading>
          </Skeleton>
        </HStack>
      </Box>
      {Array.isArray(timeCardDetails?.projects) ? (
        timeCardDetails?.projects.map((project: Project, i: number) => {
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
      ) : (
        <Box m={!loading ? '68px 0 20px 0' : '28px 0'}>
          {loading && (
            <Flex justifyContent='space-between'>
              <Skeleton height='20px' w='50%' isLoaded={!loading}></Skeleton>
              <Skeleton height='20px' w='20%' isLoaded={!loading}></Skeleton>
            </Flex>
          )}
          <Skeleton mt='15px' height='80px' isLoaded={!loading}>
            <Text
              fontSize={'22px'}
              lineHeight={'28px'}
              textAlign={'center'}
              textStyle='sourceSansProRegular'
              color='blackGray'
            >
              No time logged for the day.
            </Text>
          </Skeleton>
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
