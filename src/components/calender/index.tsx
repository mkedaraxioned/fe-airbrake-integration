import React, { useState } from 'react';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  getMonth,
  startOfMonth,
  endOfWeek,
} from 'date-fns';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { endOfMonth } from 'date-fns/esm';

interface Props {
  showDetailsHandle: (dayStr: string) => void;
}

const Calendar = ({ showDetailsHandle }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonthHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === 'next') {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const onDateClickHandle = (day: Date, dayStr: string) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const renderHeader = () => {
    const dateFormat = 'MMM yyyy';
    return (
      <Flex justifyContent='space-between' alignItems='center'>
        <Box>
          <Box
            className='icon'
            onClick={() => changeMonthHandle('prev')}
            cursor='pointer'
          >
            <HiOutlineChevronLeft size='21' />
          </Box>
        </Box>
        <Box className='col col-center' fontWeight='semibold'>
          <Text fontSize='18.77px' lineHeight='22px' color='primary'>
            {format(currentMonth, dateFormat)}
          </Text>
        </Box>
        <Box className='col col-end'>
          <Box onClick={() => changeMonthHandle('next')} cursor='pointer'>
            <HiOutlineChevronRight size='21' />
          </Box>
        </Box>
      </Flex>
    );
  };
  const renderDays = () => {
    const dateFormat = 'EEEEE';
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box w='55px' h='52px' lineHeight='52px' fontSize='14.55px' color='textLightMid' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </Box>
      );
    }
    return <Box display='flex'>{days}</Box>;
  };
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const month = getMonth(day);
        const getTime = new Date(day).getTime();
        const curTime = new Date().getTime();

        days.push(
          <Box
            w='55px'
            h='52px'
            lineHeight='52px'
            bg={`${
              isSameDay(day, selectedDate)
                ? 'primary'
                : isSameDay(day, selectedDate)
                ? 'orange.100'
                : 'white'
            }`}
            color={`${
              month !== currentMonth.getMonth()
                ? 'textLightExtra'
                : isSameDay(day, selectedDate)
                ? 'white'
                : 'textLight'
            }`}
            pointerEvents={`${
              month !== currentMonth.getMonth() || getTime > curTime
                ? 'none'
                : 'auto'
            }`}
            cursor={`${
              month !== currentMonth.getMonth() || getTime > curTime
                ? 'not-allowed'
                : 'pointer'
            }`}
            key={i}
            onClick={() => {
              const dayStr = format(cloneDay, 'dd-MM-yyyy');
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <Text as='span' fontSize='12.47px' lineHeight='18.7px'>{formattedDate}</Text>
          </Box>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <Box
          display='flex'
          flexWrap='wrap'
          className='date_row'
          key={day.getTime()}
        >
          {days}
        </Box>
      );
      days = [];
    }
    return <div className='date_body'>{rows}</div>;
  };

  const setTodaysDate = () => {
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
    showDetailsHandle(format(new Date(), 'dd-MM-yyyy'));
  };

  return (
    <Box mt='30px' textAlign='center' bg='white' p='12px 35px 5px 35px'>
      <HStack p='10px 0' justifyContent='center'>
        {/* <Text fontSize='22px' fontWeight='semibold'>
          Select a date
        </Text>
        <Button bg='primary' color='white' size='sm' onClick={setTodaysDate}>
          Today
        </Button> */}
        <Text
          color='primary'
          fontSize='22px'
          lineHeight='33px'
          fontWeight='bold'
        >
          {' '}
          Today,{format(new Date(), 'MMM do')}
        </Text>
      </HStack>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <HStack
        p='18px 0'
        color='textLight'
        fontSize='12px'
        justifyContent='space-between'
      >
        <HStack>
          <Text w='9px' h='9px' rounded='full' bg='bPink'></Text>
          <Text>No time logged</Text>
        </HStack>
        <HStack>
          <Text w='9px' h='9px' rounded='full' bg='bOrange'></Text>
          <Text>Time logged partially</Text>
        </HStack>
        <HStack>
          <Text w='9px' h='9px' rounded='full' bg='bGreen'></Text>
          <Text>Time logged</Text>
        </HStack>
      </HStack>
    </Box>
  );
};

export default Calendar;
