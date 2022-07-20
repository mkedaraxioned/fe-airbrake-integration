import React, { useState } from 'react';

import CustomRadio from '../../components/customRadio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import {
  Flex,
  FormControl,
  HStack,
  Select,
  Stack,
  Box,
  FormLabel,
  RadioGroup,
  Checkbox,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';

import './reportFilterForm.modules.css';
import { FilterFormData } from '../../interfaces/reports';
import {
  add,
  endOfMonth,
  endOfYear,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

const ReportFilterForm = () => {
  const [formData, setFormData] = useState<FilterFormData>({
    clientName: '',
    personName: '',
    projectName: '',
    groupBy: 'client',
    startDate: new Date(),
    endDate: null,
    include: {
      billable: '',
      nonBillable: '',
    },
  });

  const [dateFormat, setDateFormat] = useState({
    fixed: true,
    custom: false,
  });

  const thisWeekFirstDate = startOfWeek(new Date());
  const thisWeekLastDate = lastDayOfWeek(new Date());
  const LastWeekFirstDate = add(thisWeekFirstDate, { weeks: -1 });
  const LastWeekLastDate = add(thisWeekLastDate, { weeks: -1 });
  const thisMonthFirstDate = startOfMonth(new Date());
  const thisMonthLastDate = endOfMonth(new Date());
  const lastMonthFirstDate = add(thisMonthFirstDate, { months: -1 });
  const lastMonthLastDate = add(thisMonthLastDate, { months: -1 });
  const thisYearFirstDate = startOfYear(new Date());
  const thisYearLastDate = endOfYear(new Date());

  const changeDateFormat = (val: string) => {
    val === 'fixed'
      ? setDateFormat({ fixed: true, custom: false })
      : setDateFormat({ fixed: false, custom: true });
  };

  const selecttHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const radioHandler = (e: any) => {
    setFormData({ ...formData, groupBy: e.target.value });
  };

  const checkboxHandler = (e: any) => {
    e.target.checked
      ? setFormData({
          ...formData,
          include: { ...formData.include, [e.target.name]: e.target.value },
        })
      : setFormData({
          ...formData,
          include: { ...formData.include, [e.target.name]: '' },
        });
  };

  const selectDateHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    range === 'thisMonth'
      ? setFormData({
          ...formData,
          startDate: thisMonthFirstDate,
          endDate: thisMonthLastDate,
        })
      : range === 'lastMonth'
      ? setFormData({
          ...formData,
          startDate: lastMonthFirstDate,
          endDate: lastMonthLastDate,
        })
      : range === 'thisWeek'
      ? setFormData({
          ...formData,
          startDate: thisWeekFirstDate,
          endDate: thisWeekLastDate,
        })
      : range === 'lastWeek'
      ? setFormData({
          ...formData,
          startDate: LastWeekFirstDate,
          endDate: LastWeekLastDate,
        })
      : range === 'thisYear'
      ? setFormData({
          ...formData,
          startDate: thisYearFirstDate,
          endDate: thisYearLastDate,
        })
      : null;
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <Flex
          p='35px 37px'
          border='1px'
          borderColor='borderColor'
          justifyContent='space-between'
          bg='bgSecondary'
        >
          <Box pr='15px' flexBasis='26%'>
            <FormControl>
              <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                Date range
              </FormLabel>
              <HStack pb='32px' onClick={() => changeDateFormat('fixed')}>
                <CustomRadio isChecked={dateFormat.fixed} />
                <Select
                  h='38px'
                  id='select_project'
                  name='clientName'
                  placeholder='Select'
                  fontSize='14px'
                  color='textLightMid'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  bg='white'
                  disabled={!dateFormat.fixed}
                  _disabled={{
                    cursor: 'auto',
                  }}
                  onChange={selectDateHandler}
                >
                  <option value='thisMonth'>
                    This month: July 1 - July 31
                  </option>
                  <option value='lastMonth'>Last month: Jun 1 - Jun 30</option>
                  <option value='thisWeek'>This week: July 11 - July 17</option>
                  <option value='lastWeek'>Last week: July 4 - July 10</option>
                  <option value='thisYear'>This year: Jan 1 - Dec 31</option>
                </Select>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <CustomRadio isChecked={dateFormat.custom} />
                <Flex
                  h='38px'
                  alignItems='center'
                  border='1px'
                  borderColor='borderColor'
                  rounded='md'
                  bg='white'
                  onClick={() => changeDateFormat('custom')}
                >
                  <Stack
                    flexBasis='30%'
                    alignItems='center'
                    p='10px 0'
                    bg='grayColor'
                    color='textLightMid'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box
                    flexBasis='70%'
                    color='textLightMid'
                    fontSize='12px'
                    textStyle='sourceSansProRegular'
                  >
                    <DatePicker
                      selected={formData.startDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={(date: Date) =>
                        setFormData({ ...formData, startDate: date })
                      }
                      placeholderText='DD/MM/YYYY'
                      className='date_picker_react'
                      disabled={!dateFormat.custom}
                    />
                  </Box>
                </Flex>
                <Flex
                  h='38px'
                  alignItems='center'
                  border='1px'
                  borderColor='borderColor'
                  rounded='md'
                  bg='white'
                  onClick={() => changeDateFormat('custom')}
                >
                  <Stack
                    flexBasis='30%'
                    alignItems='center'
                    p='10px 0'
                    bg='grayColor'
                    color='textLightMid'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box
                    flexBasis='70%'
                    color='textLightMid'
                    fontSize='12px'
                    textStyle='sourceSansProRegular'
                  >
                    <DatePicker
                      selected={formData.endDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={(date: Date) =>
                        setFormData({ ...formData, endDate: date })
                      }
                      placeholderText='DD/MM/YYYY'
                      className='date_picker_react'
                      disabled={!dateFormat.custom}
                    />
                  </Box>
                </Flex>
              </HStack>
            </FormControl>
          </Box>
          <Divider
            h='auto'
            orientation='vertical'
            border='1px'
            borderColor='borderColor'
          />
          <Flex
            pr='15px'
            pl='15px'
            flexBasis='51%'
            justifyContent='space-between'
          >
            <Box flexBasis='47.5%'>
              <FormControl pb='5px'>
                <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                  Select Client
                </FormLabel>
                <Select
                  id='select_project'
                  name='clientName'
                  value={formData.clientName}
                  placeholder='All Clients'
                  height='38px'
                  fontSize='14px'
                  lineHeight='17.6px'
                  bg='white'
                  color='textLightMid'
                  textStyle='sourceSansProRegular'
                  onChange={selecttHandler}
                >
                  <option value={'ClearForMe Ongoing Retainer Agreement'}>
                    ClearForMe Ongoing Retainer Agreement
                  </option>
                  <option value={'Project 2'}>Project 2</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  m='5px 0 5px'
                  className='form_label'
                  fontWeight='600'
                >
                  Select people
                </FormLabel>
                <Select
                  id='select_project'
                  name='personName'
                  value={formData.personName}
                  placeholder='All people'
                  height='38px'
                  fontSize='14px'
                  lineHeight='17.6px'
                  bg='white'
                  color='textLightMid'
                  textStyle='sourceSansProRegular'
                  onChange={selecttHandler}
                >
                  <option value={'ClearForMe Ongoing Retainer Agreement'}>
                    ClearForMe Ongoing Retainer Agreement
                  </option>
                  <option value={'Project 2'}>Project 2</option>
                </Select>
              </FormControl>
            </Box>
            <Box flexBasis='47.5%'>
              <FormControl pb='15px'>
                <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                  Select project
                </FormLabel>
                <Select
                  id='select_project'
                  name='projectName'
                  value={formData.projectName}
                  placeholder='All Clients'
                  height='38px'
                  fontSize='14px'
                  bg='white'
                  color='textLightMid'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  onChange={selecttHandler}
                >
                  <option value={'ClearForMe Ongoing Retainer Agreement'}>
                    ClearForMe Ongoing Retainer Agreement
                  </option>
                  <option value={'Project 2'}>Project 2</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel className='form_label' fontWeight='600'>
                  Group By
                </FormLabel>
                <RadioGroup value='client'>
                  <Stack direction='row'>
                    <CustomRadio
                      value='client'
                      lable='Client'
                      onChange={radioHandler}
                      isChecked={formData.groupBy == 'client' ? true : false}
                    />
                    <Box pl='20px'>
                      <CustomRadio
                        value='people'
                        lable='People'
                        onChange={radioHandler}
                        isChecked={formData.groupBy == 'people' ? true : false}
                      />
                    </Box>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </Box>
          </Flex>
          <Divider
            h='auto'
            orientation='vertical'
            border='1px'
            borderColor='borderColor'
          />
          <Box pl='15px' flexBasis='17%'>
            <FormControl>
              <FormLabel className='form_label' fontWeight='600'>
                Include
              </FormLabel>
              <Flex className='form_label'>
                <Checkbox
                  value='billable'
                  name='billable'
                  checked={
                    formData.include.billable === 'billable' ? true : false
                  }
                  onChange={checkboxHandler}
                >
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Billable
                  </Text>
                </Checkbox>
                <Checkbox
                  pl='18px'
                  name='nonBillable'
                  value='nonBillable'
                  checked={
                    formData.include.nonBillable === 'nonBillable'
                      ? true
                      : false
                  }
                  onChange={checkboxHandler}
                >
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Non-Billable
                  </Text>
                </Checkbox>
              </Flex>
            </FormControl>
            <Button
              type='submit'
              mt='30px'
              w='170px'
              h='38px'
              variant='primary'
            >
              Update report
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default ReportFilterForm;
