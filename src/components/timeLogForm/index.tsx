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
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { TimelogFormError } from '../../interfaces/timelogForm';
import { timeStringValidate } from '../../utils/validation';
import CustomSelect, { Options } from '../customSelect';

const TimeLogFrom = ({ recentProject }: { recentProject: string }) => {
  const [formData, setFormData] = useState({
    date: new Date(),
    projectName: '',
    task: '',
    logTime: '',
    comments: '',
    billable: 'nonBillable',
  });
  const [taskNode, setTaskNode] = useState<string[]>([]);

  const [errorMsg, setErrorMsg] = useState<TimelogFormError>();
  const allTask = [
    {
      projectName: 'WordPress Maintenance',
      task: ['task 1', 'task 2', 'task 3'],
    },
    {
      projectName: 'ClearForMe Ongoing Retainer Agreement',
      task: ['task 4', 'task 5', 'task 6'],
    },
  ];

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

  useEffect(() => {
    recentProject && setFormData({ ...formData, projectName: recentProject });
  }, [recentProject]);

  useEffect(() => {
    const tasks = allTask.filter(
      (project) => project.projectName === formData.projectName,
    );
    setTaskNode(tasks[0]?.task);
  }, [formData.projectName]);

  const selecttHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setFormData({ ...formData, billable: 'billable' })
      : setFormData({ ...formData, billable: 'nonBillable' });
  };

  const selectProject = (item: Options) => {
    setFormData({ ...formData, projectName: item.name });
  };

  const fieldValidation = () => {
    const errors: TimelogFormError = {};
    const { date, projectName, task, logTime, comments } = formData;

    if (new Date(date).getTime() > new Date().getTime()) {
      errors.date = "Can't logged time for future date";
    }

    if (!projectName) {
      errors.projectName = 'Please select project ';
    }
    if (!task) {
      errors.task = 'Please Retainer month ';
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
      projectName: '',
      task: '',
      logTime: '',
      comments: '',
      billable: 'nonBillable',
    });
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(fieldValidation());
    const notValid = fieldValidation();
    if (Object.values(notValid).length <= 0) {
      alert('Success');
      reset();
    }
  };

  return (
    <Box>
      <form onSubmit={formHandler}>
        <FormControl
          m='12px 0 15px'
          isInvalid={errorMsg?.projectName ? true : false}
        >
          <FormLabel
            htmlFor='select_project'
            color='textLightMid'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
          >
            Select Project
          </FormLabel>
          <CustomSelect onChange={selectProject} />
          <FormErrorMessage>{errorMsg?.projectName}</FormErrorMessage>
        </FormControl>
        <Box>
          <Text
            pb='8px'
            color='textLightMid'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
          >
            Duration
          </Text>
          <Text
            rounded='md'
            p='10px 16px'
            border='1px'
            borderColor='borderColor'
            bg='inputBg'
            color='textLightMid'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProRegular'
          >
            Month 41 (4 April - 3 May)
          </Text>
        </Box>
        <FormControl m='14px 0' isInvalid={errorMsg?.task ? true : false}>
          <FormLabel
            htmlFor='task'
            color='textLightMid'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
          >
            Select Task
          </FormLabel>
          <Select
            id='task'
            name='task'
            value={formData.task}
            placeholder='Select'
            fontSize='14px'
            lineHeight='17.6px'
            color='textLightMid'
            textStyle='sourceSansProRegular'
            onChange={selecttHandler}
          >
            {taskNode?.map((task, index) => (
              <option value={task} key={index}>
                {task}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errorMsg?.task}</FormErrorMessage>
        </FormControl>
        <HStack justifyContent='space-between' m='14px 0'>
          <FormControl
            w='143px'
            mr='10px'
            pos='relative'
            isInvalid={errorMsg?.logTime ? true : false}
          >
            <FormLabel
              htmlFor='add_time'
              color='textLightMid'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
            >
              Add Time
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
                color='textLightMid'
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
              color='textLightMid'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
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
        <FormControl pt='5px'>
          <Checkbox
            onChange={checkboxHandler}
            _checked={{
              '.chakra-checkbox__control': {
                backgroundColor: 'btnPurple',
                border: 'none',
              },
            }}
          >
            <Text fontSize='14px' color='textLightMid'>
              Billable
            </Text>
          </Checkbox>
        </FormControl>
        <Box pt='10px'>
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
