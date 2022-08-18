import React, { useEffect, useState } from 'react';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  endOfWeek,
  isSameMonth,
  startOfMonth,
  hoursToMinutes,
  isAfter,
  getMonth,
} from 'date-fns';
import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { endOfMonth } from 'date-fns/esm';
import { _get } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { addSelectedDate } from '../../feature/timeCardSlice';

interface Props {
  showDetailsHandle: (dayStr: string) => void;
  formDate: Date;
}

const Calendar = ({ showDetailsHandle, formDate }: Props) => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedTimeData, setLoggedTimeData] = useState([]);
  useEffect(() => {
    fetchTimelogsPerMonths();
  }, [currentMonth, formDate]);
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
    dispatch(addSelectedDate(day));
    showDetailsHandle(dayStr);
  };
  const startDate = format(startOfMonth(currentMonth), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(currentMonth), 'yyyy-MM-dd');

  const fetchTimelogsPerMonths = async () => {
    const res = await _get(
      `api/timecards/range?startDate=${startDate}&endDate=${endDate}`,
    );
    setLoggedTimeData(res?.data.timelogRange);
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
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
        <Box className='col col-center' textStyle='sourceSansProBold'>
          <Text fontSize='16px' lineHeight='20.11px'>
            {format(currentMonth, dateFormat)}
          </Text>
        </Box>
        <Box className='col col-end'>
          <Box
            onClick={() => changeMonthHandle('next')}
            cursor={isSameMonth(currentMonth, new Date()) ? 'none' : 'pointer'}
            pointerEvents={
              isSameMonth(currentMonth, new Date()) ? 'none' : 'auto'
            }
            opacity={isSameMonth(currentMonth, new Date()) ? '.3' : '1'}
          >
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
          fontSize='14px'
          color='grayLight'
          key={i}
          textStyle='sourceSansProBold'
          lineHeight='46px'
        >
          {format(addDays(startDate, i), dateFormat)}
        </Box>,
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
        const getTime = new Date(day).getTime();
        const curTime = new Date().getTime();
        const month = getMonth(day);
        let bgColorVal = '';
        let toolTiplabel = '';
        loggedTimeData.length > 0 &&
          loggedTimeData.forEach(
            (value: { date: string; totalTime: string }) => {
              if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                format(new Date(day), 'yyyy-MM-dd')
              ) {
                toolTiplabel = value.totalTime;
              }

              if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                  format(new Date(day), 'yyyy-MM-dd') &&
                hoursToMinutes(parseFloat(value.totalTime)) >= 480
              ) {
                bgColorVal = '#FFECB3';
              } else if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                  format(new Date(day), 'yyyy-MM-dd') &&
                hoursToMinutes(parseFloat(value.totalTime)) < 480
              ) {
                bgColorVal = '#DCEDC8';
              }
            },
          );
        days.push(
          <Tooltip label={toolTiplabel}>
            <Box
              w='46px'
              h='46px'
              lineHeight='46px'
              bg={`${
                isSameDay(day, selectedDate)
                  ? 'btnPurple'
                  : !isAfter(new Date(), day)
                  ? '#E2E8F066'
                  : bgColorVal
              }`}
              color={`${
                month !== currentMonth.getMonth() || !isAfter(new Date(), day)
                  ? 'textLight'
                  : isSameDay(day, selectedDate)
                  ? 'white'
                  : 'textColor'
              }`}
              pointerEvents={`${getTime > curTime ? 'none' : 'auto'}`}
              cursor={`${getTime > curTime ? 'not-allowed' : 'pointer'}`}
              key={i}
              onClick={() => {
                const dayStr = format(cloneDay, 'MM-dd-yyyy');
                onDateClickHandle(cloneDay, dayStr);
              }}
            >
              <Text as='span' fontSize='12px' lineHeight='14.52px'>
                {formattedDate}
              </Text>
            </Box>
          </Tooltip>,
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
        </Box>,
      );
      days = [];
    }
    return <div className='date_body'>{rows}</div>;
  };

  const setTodaysDate = () => {
    setSelectedDate(new Date());
    dispatch(addSelectedDate(new Date()));
    setCurrentMonth(new Date());
    showDetailsHandle(format(new Date(), 'dd-MM-yyyy'));
  };

  return (
    <Box w='full' textAlign='center'>
      <Box
        pb='25px'
        textAlign='left'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text
          fontSize='22px'
          textStyle='sourceSansProBold'
          lineHeight='27.65px'
        >
          {`${
            isSameDay(new Date(), selectedDate)
              ? 'Today'
              : format(selectedDate, 'EEEE')
          }, ${format(selectedDate, 'MMMM do')}`}
        </Text>
        {isSameMonth(currentMonth, new Date()) &&
        isSameDay(new Date(), selectedDate) ? (
          <Button
            height='30px'
            variant='primary'
            background='#F3F6F9'
            color='#B0B0B1'
            border={'none'}
            _hover={{
              background: '#F3F6F9',
              color: '#B0B0B1',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            disabled
          >
            Today
          </Button>
        ) : (
          <Button height='30px' onClick={setTodaysDate} variant='primary'>
            Today
          </Button>
        )}
      </Box>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </Box>
  );
};

export default Calendar;
