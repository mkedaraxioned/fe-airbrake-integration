import { Box, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { updateTimeCardDetails } from '../../feature/timeCardSlice';
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
  const navigate = useNavigate();
  const { timeCardId } = useParams();

  const { currentSelectedDate } = useSelector(
    (state: RootState) => state.timeCard,
  );

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
        const res = await _patch(`api/timecards/${id}`, { isDeleted: true });
        if (res.status === 200) {
          const del = await _del(`api/timecards/${id}`);
          if (del?.status === 200) {
            redirectToHome(id);
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
