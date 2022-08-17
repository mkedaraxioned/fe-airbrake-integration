import { Box, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { setTimeCardDetails } from '../../feature/timeCardSlice';
import { Task } from '../../interfaces/timeCard';
import { RootState } from '../../store';
import { _del, _get, _patch } from '../../utils/api';
import { formateDate, scrollToTop } from '../../utils/common';
interface TaskDetails {
  task: Task;
}

const TimeCard = ({ task }: TaskDetails) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentSelectedDate } = useSelector(
    (state: RootState) => state.timeCard,
  );

  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const over = () => {
    setIsVisible(true);
  };

  const out = () => {
    setIsVisible(false);
  };

  const fetchTaskDetail = async (id: string | undefined) => {
    try {
      if (id) {
        console.log(id);
        const res = await _patch(`api/timecards/${id}`, { isDeleted: true });
        console.log({ res });
        if (res.status === 200) {
          const del = await _del(`api/timecards/${id}`);
          if (del?.status === 200) {
            toast({
              title: 'Entry Logs Detail',
              description: del?.data?.message,
              status: 'error',
              duration: 2000,
              position: 'top-right',
              isClosable: true,
            });
            fetchEntries(formateDate(currentSelectedDate));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEntries = async (date: string) => {
    try {
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      dispatch(setTimeCardDetails(res?.data.timecardsData));
    } catch (err: any) {
      if (err.response.status === 404) {
        dispatch(setTimeCardDetails({}));
      }
    }
  };

  const deleteEntry = () => {
    fetchTaskDetail(task.timecardId);
  };

  return (
    <Box
      p='11px 40px 11px 20px'
      m='10px 0'
      cursor='pointer'
      pos='relative'
      rounded='md'
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      bg='bgPrimary'
      fontSize='14px'
      lineHeight='17.6px'
      onMouseOver={over}
      onMouseOut={out}
      onDoubleClick={() => {
        navigate(`/dashboard/${task.timecardId}`);
        scrollToTop();
      }}
    >
      <Box textStyle='sourceSansProRegular'>
        <Text color='textColor'>{task.name}</Text>
        <Text fontSize='12px' lineHeight='15.08px' color='textLight'>
          {task.comments}
        </Text>
      </Box>
      <Text color='grayLight' textStyle='sourceSansProBold'>
        {task.timeLogged}
      </Text>
      <Box
        pos='absolute'
        top='35%'
        right='15px'
        display={isVisible ? 'block' : 'none'}
        cursor='pointer'
        color='grayLight'
      >
        <DeleteSvg title='Delete Entry' onClick={deleteEntry} />
      </Box>
    </Box>
  );
};

export default TimeCard;
