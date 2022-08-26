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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { EProjectType } from '../../constants/enum';
import { updateTimeCardDetails } from '../../feature/timeCardSlice';
import {
  TimelogFormError,
  TimeLogFormData,
} from '../../interfaces/timelogForm';
import { RootState } from '../../store';
import { _get, _post, _put } from '../../utils/api';
import { convertMinutes } from '../../utils/common';
import { timeStringValidate } from '../../utils/validation';
import CustomSelect from '../customSelect';
import { resetFormData, resetTimeLogError } from './helperConstants';

interface Props {
  formData: TimeLogFormData;
  setFormData: any;
}

const TimeLogFrom = ({ formData, setFormData }: Props) => {
  const { timeCardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [projectType, setProjectType] = useState<EProjectType | null>(null);
  const [taskNode, setTaskNode] = useState([]);
  const [milestoneData, setMilestoneData] = useState([]);
  const [errorMsg, setErrorMsg] = useState<TimelogFormError>({});

  const { projects } = useSelector((state: RootState) => state.allProjects);
  const { selectedProject } = useSelector((state: RootState) => state.timeCard);

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
        ['logTime']: 'Invalid time',
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
    const { date, projectId, taskId, milestoneId, logTime, comments } =
      formData;
    if (new Date(date).getTime() > new Date().getTime()) {
      errors.date = "Can't logged time for future date";
    }

    if (!projectId) {
      errors.projectName = 'Please select project ';
    }

    if (
      !milestoneId &&
      projectType !== EProjectType.RETAINER_GRANULAR &&
      projectType !== EProjectType.RETAINER
    ) {
      errors.milestone = 'Please select milestone ';
    }

    if (
      !taskId &&
      projectType !== EProjectType.FIXED &&
      projectType !== EProjectType.RETAINER
    ) {
      errors.task = 'Please select task ';
    }
    if (!comments) {
      errors.comments = 'Please enter comments ';
    }
    if (!logTime || timeStringValidate(formData.logTime)) {
      errors.logTime = 'Invalid time';
    }

    return errors;
  };

  const reset = () => {
    setFormData(resetFormData);
    setErrorMsg(resetTimeLogError);
    setMilestoneData([]);
    setProjectType(null);
    setFormData({ ...resetFormData, projectId: '' });
    navigate('/');
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

  const renderSelect = useCallback(() => {
    return (
      <CustomSelect
        linkLabel={'select_project'}
        onChange={selectProject}
        updateStateProps={updateStateProps}
        notValid={errorMsg?.projectName ? true : false}
        formData={formData}
      />
    );
  }, [formData]);

  const updateStateProps = {
    borderColor: `${timeCardId ? '#4657CE' : '#E2E8F0'}`,
    boxShadow: `${timeCardId ? '0 0 0 0.5px #4657ce' : 'none'}`,
  };

  const updateStatePropsTime = {
    ...updateStateProps,
    boxShadow: `${timeCardId ? '0 0 0 1.5px #4657ce' : 'none'}`,
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setErrorMsg(fieldValidation());
      const notValid = fieldValidation();
      const payload = {
        billingType: formData.billingType,
        comments: formData.comments,
        logTime: formData.logTime,
        milestoneId: formData.milestoneId,
        taskId: formData?.taskId,
        projectId: formData.projectId,
        clientId: selectedProject?.clientId,
      };

      if (formData.taskId) {
        payload.taskId = formData.taskId;
      }

      if (Object.values(notValid).length <= 0) {
        let res;
        if (timeCardId) {
          res = await _put(`api/timecards/${timeCardId}`, {
            ...payload,
            date: format(new Date(formData.date), 'yyyy-MM-dd'),
          });
        } else {
          res = await _post('api/timecards', {
            ...payload,
            date: format(new Date(formData.date), 'yyyy-MM-dd'),
          });
        }
        if (res?.status === 201 || res?.status === 200) {
          toast({
            title: 'Project',
            description: `${
              timeCardId
                ? 'Timecard updated successfully.'
                : 'Timecard created successfully.'
            }`,
            status: 'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          });
          reset();
          fetchEntries(format(new Date(formData.date), 'yyyy-MM-dd'));
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
      navigate('/');
      const res = await _get(`api/timecards/timelog?startDate=${date}`);
      if (res.data.timecardsData)
        return dispatch(updateTimeCardDetails(res?.data.timecardsData));
      dispatch(updateTimeCardDetails(null));
    } catch (err: any) {
      console.log(err);
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
            cursor={'pointer'}
          >
            Project
          </FormLabel>
          {renderSelect()}
          <FormErrorMessage mt='6px' fontSize='12px'>
            {errorMsg?.projectName}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb='18px' isInvalid={errorMsg?.milestone ? true : false}>
          <FormLabel
            htmlFor='select_milestone'
            color='grayLight'
            fontSize='14px'
            lineHeight='17.6px'
            textStyle='sourceSansProBold'
            mb='6px'
            cursor={'pointer'}
          >
            Milestone
          </FormLabel>
          <Select
            id='select_milestone'
            name='milestoneId'
            value={formData.milestoneId}
            placeholder='Select milestone'
            fontSize='14px'
            lineHeight='17.6px'
            color='grayLight'
            textStyle='sourceSansProRegular'
            onChange={selecttHandler}
            isDisabled={
              projectType === EProjectType.RETAINER_GRANULAR ||
              projectType === EProjectType.RETAINER
                ? true
                : false
            }
            cursor={'pointer'}
            {...updateStateProps}
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
          <FormErrorMessage mt='6px' fontSize='12px'>
            {errorMsg?.milestone}
          </FormErrorMessage>
        </FormControl>
        {projectType == EProjectType.RETAINER_GRANULAR && (
          <FormControl mb='18px' isInvalid={errorMsg?.task ? true : false}>
            <FormLabel
              htmlFor='select_task'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
              cursor={'pointer'}
            >
              Task
            </FormLabel>
            <Select
              id='select_task'
              name='taskId'
              value={formData.taskId}
              placeholder='Select task'
              fontSize='14px'
              lineHeight='17.6px'
              color='grayLight'
              textStyle='sourceSansProRegular'
              onChange={selecttHandler}
              cursor={'pointer'}
              {...updateStateProps}
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
            <FormErrorMessage mt='6px' fontSize='12px'>
              {errorMsg?.task}
            </FormErrorMessage>
          </FormControl>
        )}
        <HStack justifyContent='space-between' mb='18px'>
          <FormControl
            w='40%'
            maxWidth='160px'
            mr='10px'
            pos='relative'
            isInvalid={errorMsg?.logTime ? true : false}
            mb={errorMsg?.logTime ? '18px' : 0}
          >
            <FormLabel
              htmlFor='add_time'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
              cursor={'pointer'}
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
                p='0'
                textAlign='center'
                id='add_time'
                boxSizing='border-box'
                type='text'
                value={formData.logTime}
                name='logTime'
                onChange={inputHandler}
                border={errorMsg?.logTime ? '1px' : 'none'}
                _focus={{
                  boxShadow: '0 0 0 2px #3182ce',
                }}
                placeholder='07:30'
                fontSize='14px'
                textStyle='sourceSansProRegular'
                lineHeight='17.6px'
                {...updateStatePropsTime}
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
            <FormErrorMessage
              pos='absolute'
              bottom='-18px'
              mt='6px'
              fontSize='12px'
            >
              {errorMsg?.logTime}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            w='70%'
            pos='relative'
            isInvalid={errorMsg?.comments ? true : false}
            mb={errorMsg?.comments ? '18px !important' : 0}
          >
            <FormLabel
              htmlFor='comment'
              color='grayLight'
              fontSize='14px'
              lineHeight='17.6px'
              textStyle='sourceSansProBold'
              mb='6px'
              cursor={'pointer'}
            >
              Comments
            </FormLabel>
            <Input
              id='comment'
              type='text'
              value={formData.comments}
              textStyle='sourceSansProRegular'
              onChange={inputHandler}
              name='comments'
              placeholder='Describe the activity'
              fontSize='14px'
              lineHeight='17.6px'
              {...updateStateProps}
            />
            <FormErrorMessage
              pos='absolute'
              bottom='-18px'
              mt='6px'
              fontSize='12px'
            >
              {errorMsg?.comments}
            </FormErrorMessage>
          </FormControl>
        </HStack>
        <FormControl mb='15px'>
          <Checkbox
            onChange={checkboxHandler}
            isChecked={formData.billingType}
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
            {timeCardId ? 'Update Entry' : 'Add Entry'}
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
