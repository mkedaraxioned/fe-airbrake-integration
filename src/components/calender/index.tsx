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
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { endOfMonth } from 'date-fns/esm';

interface Props {
  showDetailsHandle: (dayStr: string) => void;
}

const Calendar = ({ showDetailsHandle }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loggedHourData = [
    {date:'06/05/2022',loggedTime:5},
    {date:'06/02/2022',loggedTime:8},
    {date:'05/02/2022',loggedTime:6},
    {date:'06/06/2022',loggedTime:8},
    {date:'06/08/2022',loggedTime:8},
    {date:'05/05/2022',loggedTime:6},
    {date:'05/18/2022',loggedTime:8},
  ]
  
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
      <Flex justifyContent='space-between' alignItems='center' color='black'>
        <Box>
          <Box
            className='icon'
            onClick={() => changeMonthHandle('prev')}
            cursor='pointer'
          >
            <HiOutlineChevronLeft size='21' />
          </Box>
        </Box>
        <Box
          className='col col-center'
          fontFamily='Source Sans Pro'
          fontWeight='600'
        >
          <Text fontSize='16px' lineHeight='20.11px'>
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
        <Box
          w='46px'
          h='46px'
          lineHeight='46px'
          fontSize='14px'
          color='textLightMid'
          key={i}
          fontFamily='Source Sans Pro'
          fontWeight='600'
        >
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
        let bgColorVal = ''
        loggedHourData.forEach((value)=>{
          if(new Date(value.date).getTime()===day.getTime()&&value.loggedTime>=8){
            bgColorVal = '#DCEDC8'
          } else if(new Date(value.date).getTime()===day.getTime()&&value.loggedTime<8){
            bgColorVal ='#FFECB3'
          }
        })
        
        days.push(
          <Box
            w='46px'
            h='46px'
            lineHeight='46px'
            bg={`${
              isSameDay(day , selectedDate)
                ? 'btnPurple'
                : month !== currentMonth.getMonth()?'#E2E8F066' : bgColorVal? bgColorVal:''
            }`}
            color={`${
              month !== currentMonth.getMonth()
                ? 'textLight'
                : isSameDay(day, selectedDate)
                ? 'white'
                : 'textColor'
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
            <Text as='span' fontSize='12px' lineHeight='14.52px'>
              {formattedDate}
            </Text>
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
    <Box textAlign='center'>
      <HStack
        pb='25px'
        justifyContent='space-between'
        fontFamily='Source Sans Pro'
        fontWeight='600'
      >
        <Text fontSize='22px'>Select a date</Text>
        <Button
          w='80px'
          h='30px'
          variant='primary'
          fontSize='13px'
          lineHeight='16.34px'
          onClick={setTodaysDate}
        >
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
