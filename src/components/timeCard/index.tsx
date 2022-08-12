import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { Task } from '../../interfaces/timeCard';
import { scrollToTop } from '../../utils/common';
interface TaskDetails {
  task: Task;
}

const TimeCard = ({ task }: TaskDetails) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const over = () => {
    setIsVisible(true);
  };

  const out = () => {
    setIsVisible(false);
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
        <DeleteSvg />
      </Box>
    </Box>
  );
};

export default TimeCard;
