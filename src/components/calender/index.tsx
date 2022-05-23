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
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
            <FaChevronLeft />
          </Box>
        </Box>
        <Box className='col col-center' fontWeight='semibold'>
          <span>{format(currentMonth, dateFormat)}</span>
        </Box>
        <Box className='col col-end'>
          <Box onClick={() => changeMonthHandle('next')} cursor='pointer'>
            <FaChevronRight />
          </Box>
        </Box>
      </Flex>
    );
  };
  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <Box w='46px' h='46px' lineHeight='46px' key={i}>
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
            w='46px'
            h='46px'
            bg={`${
              isSameDay(day, selectedDate)
                ? 'green.300'
                : isSameDay(day, selectedDate)
                ? 'orange.100'
                : 'white'
            }`}
            color={`${
              month !== currentMonth.getMonth() || getTime > curTime
                ? 'blackAlpha.600'
                : 'black'
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
            lineHeight='46px'
            key={i}
            onClick={() => {
              const dayStr = format(cloneDay, 'dd-MM-yyyy');
              onDateClickHandle(cloneDay, dayStr);
            }}
          >
            <span className='number'>{formattedDate}</span>
          </Box>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <Box display='flex' flexWrap='wrap' key={day.getTime()}>
          {days}
        </Box>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  };

  const setTodaysDate = () => {
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
    showDetailsHandle(format(new Date(), 'dd-MM-yyyy'));
  };

  return (
    <Box w='322px' textAlign='center'>
      <HStack p='30px 0' justifyContent='space-between'>
        <Text fontSize='22px' fontWeight='semibold'>
          Select a date
        </Text>
        <Button bg='primary' color='white' size='sm' onClick={setTodaysDate}>
          Today
        </Button>
      </HStack>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Box>
  );
};

export default Calendar;
