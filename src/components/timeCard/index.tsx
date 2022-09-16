import { Box, Text, useToast, VStack } from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { ReactComponent as EditSvg } from '../../assets/images/edit.svg';
import { updateTimeCardDetails } from '../../redux/reducers/timeCardSlice';
import { Task } from '../../interfaces/timeCard';
import { _del, _get, _put } from '../../utils/api';
import { scrollToTop } from '../../utils/common';
interface TaskDetails {
  task: Task;
  formData: any;
}

const TimeCard = ({ task, formData }: TaskDetails) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { timeCardId } = useParams();

  const [isVisible, setIsVisible] = useState(false);
  const over = () => {
    setIsVisible(true);
  };

  const out = () => {
    setIsVisible(false);
  };

  const redirectToHome = (id: any) => id === timeCardId && navigate(`/`);

  const deleteTask = async (id: string | undefined) => {
    try {
      if (id) {
        const res = await _put(`api/timecards/${id}`, { isDeleted: true });
        if (res.status === 200) {
          const del = await _del(`api/timecards/${id}`);
          if (del?.status === 200) {
            redirectToHome(id);
            toast({
              title: 'Entry Logs Detail',
              description: del?.data?.message,
              status: 'success',
              duration: 2000,
              position: 'top-right',
              isClosable: true,
            });
            fetchEntries(format(new Date(formData.date), 'yyyy-MM-dd'));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchEntries = async (date: string) => {
    try {
      navigate('/');
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData)
        return dispatch(updateTimeCardDetails(res?.data.timecardsData));
      dispatch(updateTimeCardDetails(null));
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteEntry = () => {
    deleteTask(task.timecardId);
  };

  const editEntry = () => {
    navigate(`/dashboard/${task.timecardId}`);
    scrollToTop();
  };

  return (
    <Box
      minH='80px'
      p='11px 25px 11px 20px'
      m='12px 0'
      cursor='pointer'
      pos='relative'
      rounded='md'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg='bgCard'
      fontSize='14px'
      lineHeight='17.6px'
      onMouseOver={over}
      onMouseOut={out}
    >
      <Box width='70%' textStyle='sourceSansProRegular'>
        <Text color='textColor'>{task.name}</Text>
        <Text fontSize='14px' lineHeight='17.6px' color='textLogC'>
          {task.comments}
        </Text>
      </Box>
      <VStack alignItems='flex-end' spacing='2px'>
        {task.isBillable ? (
          <Text color='bilColor' textStyle='sourceSansProRegular'>
            Billable
          </Text>
        ) : (
          <Text color='nbilColor' textStyle='sourceSansProRegular'>
            Non-Billable
          </Text>
        )}
        <Text color='grayLight' textStyle='sourceSansProBold'>
          {task.timeLogged}
        </Text>
      </VStack>
      <VStack
        pos='absolute'
        top='12%'
        right='-12px'
        display={isVisible ? 'block' : 'none'}
        cursor='pointer'
        spacing='4px'
      >
        <EditSvg title='Edit Entry' onClick={editEntry} />
        <DeleteSvg title='Delete Entry' onClick={deleteEntry} />
      </VStack>
    </Box>
  );
};

export default TimeCard;
