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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TimelogFormError } from '../../interfaces/timelogForm';
import { RootState } from '../../store';
import { _post } from '../../utils/api';
import { timeStringValidate } from '../../utils/validation';
import CustomSelect from '../customSelect';

export interface TimeLogFormData {
  date: Date;
  projectId: string;
  milestoneId: string;
  taskId: string;
  logTime: string;
  comments: string;
  billingType: boolean;
}

interface Props {
  formData: TimeLogFormData;
  setFormData: any;
}

const TimeLogFrom = ({ formData, setFormData }: Props) => {
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
    if (!taskId) {
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
      projectId: '',
      taskId: '',
      milestoneId: '',
      logTime: '',
      comments: '',
      billingType: false,
    });
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrorMsg(fieldValidation());
      const notValid = fieldValidation();
      if (Object.values(notValid).length <= 0) {
        await _post('api/timecards', formData);
        toast({
          title: 'Project',
          description: 'Timecard created successfully.',
          status: 'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
        reset();
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

  return (
    <Box>
      <form onSubmit={formHandler}>
        <FormControl
          m='12px 0 15px'
          isInvalid={errorMsg?.projectName ? true : false}
        >
          <FormLabel
            htmlFor='select_project'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
          >
            Project
          </FormLabel>
          <CustomSelect onChange={selectProject} />
          <FormErrorMessage>{errorMsg?.projectName}</FormErrorMessage>
        </FormControl>
        {/* <Box>
          <Text
            pb='8px'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
          >
            Milestone
          </Text>
          <Text
            rounded='md'
            p='10px 16px'
            border='1px'
            borderColor='borderColor'
            bg='inputBg'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProRegular'
          >
            Month 41 (4 April - 3 May)
          </Text>
        </Box> */}
        <FormControl m='14px 0' isInvalid={errorMsg?.task ? true : false}>
          <FormLabel
            htmlFor='task'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
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
          <FormControl m='14px 0' isInvalid={errorMsg?.task ? true : false}>
            <FormLabel
              htmlFor='task'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
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
        <HStack justifyContent='space-between' m='14px 0'>
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
            <Text fontSize='14px' color='grayLight'>
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
