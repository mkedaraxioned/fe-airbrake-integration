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
import { hoursToDecimal } from '../../utils/common';
interface Props {
  showDetailsHandle: (dayStr: Date) => void;
  formDate: Date;
  setFormData: any;
  formData: any;
}

const Calendar = ({
  showDetailsHandle,
  formDate,
  setFormData,
  formData,
}: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loggedTimeData, setLoggedTimeData] = useState([]);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDateCell = startOfWeek(monthStart);
  const endDateCell = endOfWeek(monthEnd);

  useEffect(() => {
    fetchTimelogsPerMonths();
  }, [currentMonth, formDate]);

  useEffect(() => {
    if (formDate) {
      setSelectedDate(new Date(formDate));
    }
  }, [formDate]);

  const changeMonthHandle = (btnType: string) => {
    if (btnType === 'prev') {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === 'next') {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };
  const onDateClickHandle = (day: Date) => {
    setSelectedDate(day);
    showDetailsHandle(day);
  };
  const startDate = format(startDateCell, 'yyyy-MM-dd');
  const endDate = format(endDateCell, 'yyyy-MM-dd');

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
    const startDateVal = startOfWeek(currentMonth, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <Flex
          w='46px'
          h='46px'
          fontSize='14px'
          color='grayLight'
          key={`${i}${format(addDays(startDateVal, i), dateFormat)}`}
          textStyle='sourceSansProBold'
          alignItems='center'
          justifyContent='center'
        >
          {format(addDays(startDateVal, i), dateFormat)}
        </Flex>,
      );
    }
    return <Box display='flex'>{days}</Box>;
  };

  const renderCells = () => {
    const dateFormat = 'd';
    const rows = [];
    let days = [];
    let day = startDateCell;
    let formattedDate = '';

    while (day <= endDateCell) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const getTime = new Date(day).getTime();
        const curTime = new Date().getTime();
        const month = getMonth(day);
        let bgColorVal = '';
        let toolTiplabel = null;

        Array.isArray(loggedTimeData) &&
          loggedTimeData.forEach(
            (value: { date: string; totalTime: string }) => {
              if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                format(new Date(day), 'yyyy-MM-dd')
              ) {
                toolTiplabel = hoursToDecimal(value.totalTime).toFixed(2);
              }
              if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                  format(new Date(day), 'yyyy-MM-dd') &&
                hoursToMinutes(hoursToDecimal(value.totalTime)) < 450
              ) {
                bgColorVal = '#FFF3E0';
              } else if (
                format(new Date(value.date.substr(0, 10)), 'yyyy-MM-dd') ===
                  format(new Date(day), 'yyyy-MM-dd') &&
                hoursToMinutes(hoursToDecimal(value.totalTime)) >= 450
              ) {
                bgColorVal = '#E8F5E9';
              }
            },
          );
        days.push(
          <Tooltip label={toolTiplabel && `${toolTiplabel} Hrs`}>
            <Flex
              w='46px'
              h='46px'
              alignItems='center'
              justifyContent='center'
              bg={`${!isAfter(new Date(), day) ? '#E2E8F066' : bgColorVal}`}
              color={`${
                month !== currentMonth.getMonth() || !isAfter(new Date(), day)
                  ? 'textLight'
                  : 'textColor'
              }`}
              className={`${
                isSameDay(day, selectedDate) ? 'selectedDate' : ''
              }`}
              pointerEvents={`${getTime > curTime ? 'none' : 'auto'}`}
              cursor={`${getTime > curTime ? 'not-allowed' : 'pointer'}`}
              key={`${day.getTime()}${i}`}
              onClick={() => {
                onDateClickHandle(cloneDay);
              }}
            >
              <Text
                as='span'
                fontSize='12px'
                lineHeight='14.52px'
                fontWeight={isSameDay(new Date(), day) ? 'bold' : 'normal'}
              >
                {formattedDate}
              </Text>
            </Flex>
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
    setCurrentMonth(new Date());
    setFormData({ ...formData, date: new Date() });
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
        <Box>
          <Text
            fontSize='16px'
            textStyle='sourceSansProRegular'
            lineHeight='20.11px'
            color='textGray'
          >
            {`${
              isSameDay(new Date(), selectedDate)
                ? 'Today'
                : format(selectedDate, 'EEEE')
            }`}
          </Text>
          <Text
            fontSize='22px'
            textStyle='sourceSansProBold'
            lineHeight='27.65px'
            color='textColor'
          >
            {` ${format(selectedDate, 'do MMMM')}`}
          </Text>
        </Box>
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
