import React, { useEffect, useState } from 'react';

import CustomRadio from '../../components/customRadio';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineCalendar } from 'react-icons/ai';
import { ReactComponent as DownArrow } from '../../assets/images/downArrow.svg';
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
  searchQueryValues,
  setSearchQueryValues,
}: Props) => {
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const { data: clientData } = useGetAllClientsQuery();
  const { data: projectsData } = useGetAllProjectsQuery();
  const { data: usersData } = useGetAllUsersQuery();
  const [activeDateRange, setActiveDateRange] = useState('');

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

  useEffect(() => {
    setSelectRangeItems();
  }, [formData, searchQueryValues]);

  useEffect(() => {
    checkboxValueHandle();
  }, [checkedItems]);

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
        obj[key] = new Date(value) as Date;
      } else {
        obj[key] = value;
      }
    });
    if (obj) {
      setFormData({ ...formData, ...obj });
    }
    if (searchParamsObj) {
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

  const checkboxValueHandle = () => {
    if (checkedItems[0] && checkedItems[1]) {
      setFormData({
        ...formData,
        billableType: '',
      });
    } else if (checkedItems[0]) {
      setFormData({
        ...formData,
        billableType: 'billable',
      });
    } else if (checkedItems[1]) {
      setFormData({
        ...formData,
        billableType: 'nonBillable',
      });
    } else {
      setFormData({
        ...formData,
        billableType: '',
      });
    }
  };

  const selectDateHandler = (type: string) => {
    const range = type;
    if (range === 'thisMonth') {
      setFormData({
        ...formData,
        startDate: thisMonthFirstDate,
        endDate: thisMonthLastDate,
      });
      setActiveDateRange('thisMonth');
    } else if (range === 'lastMonth') {
      setFormData({
        ...formData,
        startDate: lastMonthFirstDate,
        endDate: lastMonthLastDate,
      });
      setActiveDateRange('lastMonth');
    } else if (range === 'thisWeek') {
      setFormData({
        ...formData,
        startDate: thisWeekFirstDate,
        endDate: thisWeekLastDate,
      });
      setActiveDateRange('thisWeek');
    } else if (range === 'lastWeek') {
      setFormData({
        ...formData,
        startDate: LastWeekFirstDate,
        endDate: LastWeekLastDate,
      });
      setActiveDateRange('lastWeek');
    } else if (range === 'thisYear') {
      setFormData({
        ...formData,
        startDate: thisYearFirstDate,
        endDate: thisYearLastDate,
      });
      setActiveDateRange('thisYear');
    }
  };

  const setSelectRangeItems = () => {
    if (
      format(formData.startDate as Date, 'MM/dd/yyyy') ===
        format(thisWeekFirstDate, 'MM/dd/yyyy') &&
      format(formData.endDate as Date, 'MM/dd/yyyy') ===
        format(thisWeekLastDate, 'MM/dd/yyyy')
    ) {
      setActiveDateRange('thisWeek');
    } else if (
      format(formData.startDate as Date, 'MM/dd/yyyy') ===
        format(LastWeekFirstDate, 'MM/dd/yyyy') &&
      format(formData.endDate as Date, 'MM/dd/yyyy') ===
        format(LastWeekLastDate, 'MM/dd/yyyy')
    ) {
      setActiveDateRange('lastWeek');
    } else if (
      format(formData.startDate as Date, 'MM/dd/yyyy') ===
        format(thisMonthFirstDate, 'MM/dd/yyyy') &&
      format(formData.endDate as Date, 'MM/dd/yyyy') ===
        format(thisMonthLastDate, 'MM/dd/yyyy')
    ) {
      setActiveDateRange('thisMonth');
    } else if (
      format(formData.startDate as Date, 'MM/dd/yyyy') ===
        format(lastMonthFirstDate, 'MM/dd/yyyy') &&
      format(formData.endDate as Date, 'MM/dd/yyyy') ===
        format(lastMonthLastDate, 'MM/dd/yyyy')
    ) {
      setActiveDateRange('lastMonth');
    } else if (
      format(formData.startDate as Date, 'MM/dd/yyyy') ===
        format(thisYearFirstDate, 'MM/dd/yyyy') &&
      format(formData.endDate as Date, 'MM/dd/yyyy') ===
        format(thisYearLastDate, 'MM/dd/yyyy')
    ) {
      setActiveDateRange('thisYear');
    } else {
      setActiveDateRange('');
    }
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
          <Box pr='18px' flexBasis='27%'>
            <FormControl>
              <FormLabel m='5px 0' className='form_label' fontWeight='600'>
                Date range
              </FormLabel>
              <HStack pb='32px'>
                <Button
                  w='95px'
                  h='36px'
                  fontSize='14px'
                  bg='white'
                  onClick={() => selectDateHandler('thisWeek')}
                  variant='secondary'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6'
                  mr='5px'
                  color={
                    activeDateRange === 'thisWeek' ? 'btnPurple' : 'grayBtnText'
                  }
                  borderColor={
                    activeDateRange === 'thisWeek' ? 'btnPurple' : 'grayBtnText'
                  }
                >
                  This week
                </Button>
                <Button
                  w='95px'
                  h='36px'
                  mr='5px !important'
                  bg='white'
                  fontSize='14px'
                  onClick={() => selectDateHandler('lastWeek')}
                  variant='secondary'
                  textStyle='sourceSansProRegular'
                  lineHeight='17.6'
                  color={
                    activeDateRange === 'lastWeek' ? 'btnPurple' : 'grayBtnText'
                  }
                  borderColor={
                    activeDateRange === 'lastWeek' ? 'btnPurple' : 'grayBtnText'
                  }
                >
                  Last week
                </Button>
                <Menu>
                  <MenuButton
                    as={Button}
                    h='36px'
                    w='95px'
                    border='1px'
                    borderColor='grayBtnText'
                    fontSize='14px'
                    textStyle='sourceSansProRegular'
                    bg='white'
                    color='grayBtnText'
                    lineHeight='17.6'
                    rightIcon={<DownArrow />}
                  >
                    More
                  </MenuButton>
                  <MenuList zIndex='5'>
                    <MenuItem
                      onClick={() => selectDateHandler('thisMonth')}
                      color={
                        activeDateRange === 'thisMonth'
                          ? 'btnPurple'
                          : 'grayBtnText'
                      }
                      textStyle='sourceSansProRegular'
                    >
                      This Month
                    </MenuItem>
                    <MenuItem
                      onClick={() => selectDateHandler('lastMonth')}
                      color={
                        activeDateRange === 'lastMonth'
                          ? 'btnPurple'
                          : 'grayBtnText'
                      }
                      textStyle='sourceSansProRegular'
                    >
                      Last Month
                    </MenuItem>
                    <MenuItem
                      onClick={() => selectDateHandler('thisYear')}
                      color={
                        activeDateRange === 'thisYear'
                          ? 'btnPurple'
                          : 'grayBtnText'
                      }
                      textStyle='sourceSansProRegular'
                    >
                      This Year
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </FormControl>
            <FormControl>
              <HStack>
                <Flex
                  h='38px'
                  width='149px'
                  mr='6px'
                  alignItems='center'
                  border='1px'
                  borderColor='borderColor'
                  rounded='md'
                  bg='white'
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
                    />
                  </Box>
                </Flex>
                <Flex
                  h='38px'
                  width='149px'
                  alignItems='center'
                  border='1px'
                  borderColor='borderColor'
                  rounded='md'
                  bg='white'
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
                  isChecked={checkedItems[0]}
                  onChange={(e) =>
                    setCheckedItems([e.target.checked, checkedItems[1]])
                  }
                  _checked={{
                    '.chakra-checkbox__control': {
                      backgroundColor: 'btnPurple',
                      border: 'none',
                    },
                  }}
                >
                  <Text fontSize='14px' lineHeight='17.6px'>
                    Billable
                  </Text>
                </Checkbox>
                <Checkbox
                  pl='18px'
                  name='billableType'
                  value='nonBillable'
                  isChecked={checkedItems[1]}
                  onChange={(e) =>
                    setCheckedItems([checkedItems[0], e.target.checked])
                  }
                  _checked={{
                    '.chakra-checkbox__control': {
                      backgroundColor: 'btnPurple',
                      border: 'none',
                    },
                  }}
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
