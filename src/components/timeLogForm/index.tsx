import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setTimeCardDetails } from '../../feature/timeCardSlice';
import { TimelogFormError } from '../../interfaces/timelogForm';
import { RootState } from '../../store';
import { _get, _post } from '../../utils/api';
import { convertMinutes, formateDate } from '../../utils/common';
import { timeStringValidate } from '../../utils/validation';
import CustomSelect from '../customSelect';

export interface TimeLogFormData {
  date: Date | string;
  projectId: string;
  milestoneId: string;
  taskId?: string;
  logTime: string;
  comments: string;
  billingType: boolean;
}

interface Props {
  formData: TimeLogFormData;
  setFormData: any;
}

const TimeLogFrom = ({ formData, setFormData }: Props) => {
  const { timeCardId } = useParams();
  const dispatch = useDispatch();
  const { currentSelectedDate } = useSelector(
    (state: RootState) => state.timeCard,
  );

  const [projectType, setProjectType] = useState<string>('');

  const [taskNode, setTaskNode] = useState([]);
  const [milestoneData, setMilestoneData] = useState([]);

  const [errorMsg, setErrorMsg] = useState<TimelogFormError>();
  const { projects } = useSelector((state: RootState) => state.allProjects);
  const toast = useToast();
  useEffect(() => {
    selectOptionData();
  }, [formData.projectId]);

  useEffect(() => {
    if (!formData.logTime) return;
    const valid = !timeStringValidate(formData.logTime);
    if (valid) {
      setErrorMsg({
        ...errorMsg,
        ['logTime']: '',
      });
    } else {
      setErrorMsg({
        ...errorMsg,
        ['logTime']: 'Please enter valid time',
      });
    }
  }, [formData.logTime]);

  const selectOptionData = () => {
    const project = projects.find(
      (project: { id: string }) => project.id === formData.projectId,
    );
    if (project) {
      setTaskNode(project.tasks);
      setMilestoneData(project.milestones);
      setProjectType(project.type);
    }
  };

  const selecttHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setFormData({ ...formData, billingType: true })
      : setFormData({ ...formData, billingType: false });
  };

  const selectProject = (item: { value: string }) => {
    setFormData({ ...formData, projectId: item.value });
  };

  const fieldValidation = () => {
    const errors: TimelogFormError = {};
    const { date, projectId, taskId, logTime, comments } = formData;

    if (new Date(date).getTime() > new Date().getTime()) {
      errors.date = "Can't logged time for future date";
    }

    if (!projectId) {
      errors.projectName = 'Please select project ';
    }
    if (!taskId && projectType !== 'FIXED') {
      errors.task = 'Please select task ';
    }
    if (!comments) {
      errors.comments = 'Please enter comments ';
    }
    if (!logTime || timeStringValidate(formData.logTime)) {
      errors.logTime = 'Please enter valid time';
    }

    return errors;
  };

  const reset = () => {
    setFormData({
      date: new Date(),
      projectId: '',
      taskId: '',
      milestoneId: '',
      logTime: '',
      comments: '',
      billingType: false,
    });
  };

  const fetchTaskDetail = async (id: string) => {
    try {
      const res = await _get(`api/timecards/${id}`);
      const task = res?.data.timecard;
      if (task) {
        setFormData({
          ...formData,
          date: task.date,
          projectId: task.projectId,
          taskId: task?.taskId,
          milestoneId: task.milestoneId,
          logTime: convertMinutes(task.logTime),
          comments: task.comments,
          billingType: task.billingType,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeCardId) {
      fetchTaskDetail(timeCardId);
    }
  }, [timeCardId]);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrorMsg(fieldValidation());
      const notValid = fieldValidation();
      const payload: TimeLogFormData = {
        billingType: formData.billingType,
        comments: formData.comments,
        date: format(new Date(formData.date), "yyyy-MM-dd'T'hh:mm:ss"),
        logTime: formData.logTime,
        milestoneId: formData.milestoneId,
        projectId: formData.projectId,
      };
      if (formData.taskId) {
        payload.taskId = formData.taskId;
      }
      console.log(payload, 'payload');
      if (Object.values(notValid).length <= 0) {
        const res = await _post('api/timecards', payload);
        if (res?.status === 201) {
          toast({
            title: 'Project',
            description: 'Timecard created successfully.',
            status: 'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
          reset();
          fetchEntries(formateDate(currentSelectedDate));
        }
      }
    } catch (error: any) {
      toast({
        title: 'Timecard',
        description: error.response.data.error,
        status: 'error',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const fetchEntries = async (date: string) => {
    try {
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      dispatch(setTimeCardDetails(res?.data.timecardsData));
    } catch (err: any) {
      if (err.response.status === 404) {
        dispatch(setTimeCardDetails(null));
        toast({
          title: 'Entry Logs Detail',
          description: err?.response?.data?.error,
          status: 'error',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <FormControl mb='18px' isInvalid={errorMsg?.projectName ? true : false}>
          <FormLabel
            htmlFor='select_project'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
            mb='6px'
          >
            Project
          </FormLabel>
          <CustomSelect onChange={selectProject} />
          <FormErrorMessage>{errorMsg?.projectName}</FormErrorMessage>
        </FormControl>
        <FormControl mb='18px' isInvalid={errorMsg?.task ? true : false}>
          <FormLabel
            htmlFor='task'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
            mb='6px'
          >
            Milestone
          </FormLabel>
          <Select
            id='task'
            name='milestoneId'
            value={formData.milestoneId}
            placeholder='Select'
            fontSize='14px'
            lineHeight='17.6px'
            color='grayLight'
            textStyle='sourceSansProRegular'
            onChange={selecttHandler}
          >
            {milestoneData.length > 0 &&
              milestoneData.map(
                (task: { id: string; title: string }, index) => {
                  return (
                    <option value={task.id} key={index}>
                      {task.title}
                    </option>
                  );
                },
              )}
          </Select>
          <FormErrorMessage>{errorMsg?.task}</FormErrorMessage>
        </FormControl>
        {projectType !== 'FIXED' && (
          <FormControl mb='18px' isInvalid={errorMsg?.task ? true : false}>
            <FormLabel
              htmlFor='task'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
            >
              Task
            </FormLabel>
            <Select
              id='task'
              name='taskId'
              value={formData.taskId}
              placeholder='Select'
              fontSize='14px'
              lineHeight='17.6px'
              color='grayLight'
              textStyle='sourceSansProRegular'
              onChange={selecttHandler}
            >
              {taskNode.length > 0 &&
                taskNode.map((task: { id: string; title: string }, index) => {
                  return (
                    <option value={task.id} key={index}>
                      {task.title}
                    </option>
                  );
                })}
            </Select>
            <FormErrorMessage>{errorMsg?.task}</FormErrorMessage>
          </FormControl>
        )}
        <HStack justifyContent='space-between' mb='18px'>
          <FormControl
            w='143px'
            mr='10px'
            pos='relative'
            isInvalid={errorMsg?.logTime ? true : false}
          >
            <FormLabel
              htmlFor='add_time'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
            >
              Time
            </FormLabel>
            <Flex
              alignItems='center'
              rounded='md'
              border='1px'
              borderColor='borderColor'
            >
              <Input
                w='50%'
                h='38px'
                id='add_time'
                boxSizing='border-box'
                type='text'
                value={formData.logTime}
                name='logTime'
                onChange={inputHandler}
                border='none'
                placeholder='88:88'
                fontSize='14px'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
              />
              <Text
                w='50%'
                h='38px'
                textAlign='center'
                p='8px 0'
                bg='inputBg'
                fontSize='14px'
                lineHeight='21px'
                color='grayLight'
                textStyle='sourceSansProRegular'
              >
                Hours
              </Text>
            </Flex>
            <FormErrorMessage pos='absolute' bottom='-18px'>
              {errorMsg?.logTime}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            w='70%'
            pos='relative'
            isInvalid={errorMsg?.comments ? true : false}
          >
            <FormLabel
              htmlFor='select_task'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
            >
              Comments
            </FormLabel>
            <Input
              type='text'
              value={formData.comments}
              textStyle='sourceSansProRegular'
              onChange={inputHandler}
              name='comments'
              placeholder='Please describe the activity'
              fontSize='14px'
              lineHeight='17.6px'
            />
            <FormErrorMessage pos='absolute' bottom='-18px'>
              {errorMsg?.comments}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl mb='18px'>
          <Checkbox
            onChange={checkboxHandler}
            _checked={{
              '.chakra-checkbox__control': {
                backgroundColor: 'btnPurple',
                border: 'none',
              },
            }}
          >
            <Text fontSize='14px' color='grayLight'>
              Billable
            </Text>
          </Checkbox>
        </FormControl>
        <Box>
          <Button w='137px' type='submit' variant='primary' mr='22px'>
            Add Entry
          </Button>
          <Button w='105px' variant='secondary' onClick={reset}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TimeLogFrom;
