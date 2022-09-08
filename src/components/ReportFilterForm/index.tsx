import React, { useEffect, useState } from 'react';

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
  format,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import {
  useGetAllClientsQuery,
  useGetAllProjectsQuery,
  useGetAllUsersQuery,
} from '../../redux/apis/dashboard';

interface Props {
  formData: FilterFormData;
  setFormData: any;
  searchQueryValues: any;
  setSearchQueryValues: any;
}

const ReportFilterForm = ({
  formData,
  setFormData,
  setSearchQueryValues,
}: Props) => {
  const [dateFormat, setDateFormat] = useState({
    fixed: true,
    custom: false,
  });
  const { data: clientData } = useGetAllClientsQuery();
  const { data: projectsData } = useGetAllProjectsQuery();
  const { data: usersData } = useGetAllUsersQuery();

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

  useEffect(() => {
    getQueryParamsValues();
  }, []);

  const changeDateFormat = (val: string) => {
    val === 'fixed'
      ? setDateFormat({ fixed: true, custom: false })
      : setDateFormat({ fixed: false, custom: true });
  };

  const insertUrlParam = (key: string, value: string) => {
    if (window && window.history.pushState) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newurl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname +
        '?' +
        searchParams.toString();
      window.history.pushState({ path: newurl }, '', newurl);
    }
  };

  const getQueryParamsValues = () => {
    const params = new URLSearchParams(window.location.search);
    const obj: any = {};
    const searchParamsObj: any = {};
    params.forEach((value, key) => {
      searchParamsObj[key] = value;
      if (key === 'endDate' || key === 'startDate') {
        obj[key] = new Date(value);
      } else {
        obj[key] = value;
      }
    });
    if (obj) {
      setFormData({ ...formData, ...obj });
    }
    if (setSearchQueryValues) {
      setSearchQueryValues({
        ...searchParamsObj,
      });
    }
  };

  const selecttHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const radioHandler = (e: any) => {
    setFormData({ ...formData, groupBy: e.target.value });
  };

  const checkboxHandler = (e: any) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: '',
      });
    }
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
    const {
      startDate,
      endDate,
      groupBy,
      billableType,
      clientId,
      userId,
      projectId,
    } = formData;
    if (startDate) {
      insertUrlParam('startDate', format(startDate as Date, 'yyyy-MM-dd'));
    } else {
      insertUrlParam('startDate', '');
    }
    if (endDate) {
      insertUrlParam('endDate', format(endDate as Date, 'yyyy-MM-dd'));
    } else {
      insertUrlParam('endDate', '');
    }
    if (groupBy) {
      insertUrlParam('groupBy', groupBy);
    } else {
      insertUrlParam('groupBy', '');
    }
    if (billableType) {
      insertUrlParam('billableType', billableType);
    } else {
      insertUrlParam('billableType', '');
    }
    if (clientId) {
      insertUrlParam('clientId', clientId);
    } else {
      insertUrlParam('clientId', '');
    }
    if (userId) {
      insertUrlParam('userId', userId);
    } else {
      insertUrlParam('userId', '');
    }
    if (projectId) {
      insertUrlParam('projectId', projectId);
    } else {
      insertUrlParam('projectId', '');
    }
    getQueryParamsValues();
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
          <Box pr='15px' flexBasis='27%'>
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
                  color='grayLight'
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
                    This month: {format(thisMonthFirstDate, 'MMM dd')} -{' '}
                    {format(thisMonthLastDate, 'MMM dd')}
                  </option>
                  <option value='lastMonth'>
                    Last month: {format(lastMonthFirstDate, 'MMM dd')} -{' '}
                    {format(lastMonthLastDate, 'MMM dd')}
                  </option>
                  <option value='thisWeek'>
                    This week: {format(thisWeekFirstDate, 'MMM dd')} -{' '}
                    {format(thisWeekLastDate, 'MMM dd')}
                  </option>
                  <option value='lastWeek'>
                    Last week: {format(LastWeekFirstDate, 'MMM dd')} -{' '}
                    {format(LastWeekLastDate, 'MMM dd')}
                  </option>
                  <option value='thisYear'>
                    This year: {format(thisYearFirstDate, 'MMM dd')} -{' '}
                    {format(thisYearLastDate, 'MMM dd')}
                  </option>
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
                    color='grayLight'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box
                    flexBasis='70%'
                    color='grayLight'
                    fontSize='12px'
                    textStyle='sourceSansProRegular'
                  >
                    <DatePicker
                      selected={formData.startDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={(date: Date) => {
                        setFormData({ ...formData, startDate: date });
                      }}
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
                    color='grayLight'
                  >
                    <AiOutlineCalendar fontSize='20px' />
                  </Stack>
                  <Box
                    flexBasis='70%'
                    color='grayLight'
                    fontSize='12px'
                    textStyle='sourceSansProRegular'
                  >
                    <DatePicker
                      selected={formData.endDate}
                      dateFormat='dd/MM/yyyy'
                      onChange={(date: Date) => {
                        setFormData({ ...formData, endDate: date });
                        insertUrlParam('endDate', format(date, 'yyyy-MM-dd'));
                      }}
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
            flexBasis='50%'
            justifyContent='space-between'
          >
            <Box flexBasis='47.5%'>
              <FormControl pb='5px'>
                <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                  Select Client
                </FormLabel>
                <Select
                  id='select_project'
                  name='clientId'
                  value={formData.clientId}
                  placeholder='All Clients'
                  height='38px'
                  fontSize='14px'
                  lineHeight='17.6px'
                  bg='white'
                  color='grayLight'
                  textStyle='sourceSansProRegular'
                  onChange={selecttHandler}
                >
                  {clientData &&
                    clientData.clients.length > 0 &&
                    clientData.clients.map(
                      (client: { id: string; name: string }, index: number) => {
                        return (
                          <option value={client.id} key={index}>
                            {client.name}
                          </option>
                        );
                      },
                    )}
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
                  name='userId'
                  value={formData.userId}
                  placeholder='All people'
                  height='38px'
                  fontSize='14px'
                  lineHeight='17.6px'
                  bg='white'
                  color='grayLight'
                  textStyle='sourceSansProRegular'
                  onChange={selecttHandler}
                >
                  {usersData &&
                    usersData.users.length > 0 &&
                    usersData.users.map(
                      (user: { name: string; id: string }, index: number) => {
                        return (
                          <option value={user.id} key={index}>
                            {user.name}
                          </option>
                        );
                      },
                    )}
                </Select>
              </FormControl>
            </Box>
            <Box flexBasis='47%'>
              <FormControl pb='15px'>
                <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                  Select project
                </FormLabel>
                <Select
                  id='select_project'
                  name='projectId'
                  value={formData.projectId}
                  placeholder='All Project'
                  height='38px'
                  fontSize='14px'
                  bg='white'
                  color='grayLight'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6px'
                  onChange={selecttHandler}
                >
                  {projectsData &&
                    projectsData.projects.length > 0 &&
                    projectsData.projects
                      .filter(
                        (project: { clientId: string }) =>
                          project.clientId === formData.clientId,
                      )
                      .sort((a: { title: string }, b: { title: string }) =>
                        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1,
                      )
                      .map(
                        (
                          project: { id: string; title: string },
                          index: number,
                        ) => {
                          return (
                            <option value={project.id} key={index}>
                              {project.title}
                            </option>
                          );
                        },
                      )}
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
          <Box pl='11px' flexBasis='18%'>
            <FormControl>
              <FormLabel className='form_label' fontWeight='600'>
                Include
              </FormLabel>
              <Flex className='form_label'>
                <Checkbox
                  value='billable'
                  name='billableType'
                  isChecked={
                    formData.billableType === 'billable' ? true : false
                  }
                  checked={formData.billableType === 'billable' ? true : false}
                  onChange={checkboxHandler}
                >
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Billable
                  </Text>
                </Checkbox>
                <Checkbox
                  pl='18px'
                  name='billableType'
                  value='nonBillable'
                  isChecked={
                    formData.billableType === 'nonBillable' ? true : false
                  }
                  checked={
                    formData.billableType === 'nonBillable' ? true : false
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
